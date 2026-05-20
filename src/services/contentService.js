// ─── GoFlix Content Service ───────────────────────────────────────────────────
// Wired to the real GoFlix backend (Cloudflare Stream + FastAPI on Railway)

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://goflix-production.up.railway.app";

// ─── Core fetch helper ────────────────────────────────────────────────────────

async function apiFetch(path, { params, method = "GET", body, auth = false } = {}) {
  const url = new URL(`${BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v != null && v !== "") url.searchParams.set(k, String(v));
    });
  }

  const headers = { "Content-Type": "application/json", Accept: "application/json" };

  if (auth) {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("goflix_token") : null;
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
    // ─── HTTP cache strategy ─────────────────────────────────────────────────
    // Public endpoints (movies, reels, series listings): use the browser's
    // built-in HTTP cache. On back-navigation the browser can serve the
    // response instantly without hitting the network, so images/thumbnails
    // load from cache rather than flashing blank while the request is in-flight.
    //
    // Authenticated endpoints (stream URLs, watch history, progress): always
    // bypass cache — these are user-specific and must never be served stale.
    cache: auth ? "no-store" : "default",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.detail || err.message || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ─── Field normaliser ─────────────────────────────────────────────────────────
// Backend uses snake_case + different field names from what components expect.
// This function maps every backend field to what ContentCard / HeroBanner / etc. use.

function normaliseMovie(m) {
  if (!m) return null;

  // Genre: backend sends a string like "Drama,Thriller" or null
  const genre =
    typeof m.genre === "string" && m.genre.trim()
      ? m.genre.split(",").map((g) => g.trim()).filter(Boolean)
      : Array.isArray(m.genre)
      ? m.genre
      : [];

  // Duration: convert seconds to readable string e.g. "1h 52m"
  let duration = null;
  if (m.duration_seconds) {
    const h = Math.floor(m.duration_seconds / 3600);
    const min = Math.floor((m.duration_seconds % 3600) / 60);
    duration = h > 0 ? `${h}h ${min}m` : `${min}m`;
  }

  return {
    // Identity
    id:             m.id,
    type:           m.content_type === "series" ? "series" : "movie",
    content_type:   m.content_type,

    // Text
    title:          m.title || "",
    description:    m.overview || m.description || "",
    subtitle:       m.tagline || null,

    // Images — components use thumbnail + banner
    thumbnail:      m.thumbnail_url || m.poster_url || null,
    banner:         m.backdrop_url  || m.thumbnail_url || m.poster_url || null,
    poster_url:     m.poster_url    || null,
    thumbnail_url:  m.thumbnail_url || null,
    backdrop_url:   m.backdrop_url  || null,

    // Video
    trailer_url:    m.trailer_url   || null,
    cf_video_uid:   m.cf_video_uid  || m.hls_url || null,

    // Meta
    genre,
    releaseYear:    m.release_year  || null,
    duration,
    duration_seconds: m.duration_seconds || null,
    views:          m.popularity    || 0,
    popularity:     m.popularity    || 0,
    maturityRating: m.age_rating    || null,
    isFeatured:     m.is_featured   || false,

    // Series-specific
    seasons:        m.season_count  || m.seasons || null,
    episodes:       m.total_episodes || m.episodes || null,
    season_count:   m.season_count  || null,
    series_id:      m.series_id     || null,
    season_number:  m.season_number || null,
    episode_number: m.episode_number || null,
  };
}

function normaliseReel(r) {
  if (!r) return null;

  const genre =
    typeof r.genre === "string" && r.genre.trim()
      ? r.genre.split(",").map((g) => g.trim()).filter(Boolean)
      : Array.isArray(r.genre)
      ? r.genre
      : [];

  let duration = null;
  if (r.duration_seconds) {
    const min = Math.floor(r.duration_seconds / 60);
    const sec = r.duration_seconds % 60;
    duration = min > 0 ? `${min}:${String(sec).padStart(2, "0")}` : `0:${String(sec).padStart(2, "0")}`;
  }

  return {
    id:             r.id,
    type:           "reel",
    title:          r.title || r.caption || "",
    description:    r.description || r.caption || "",
    thumbnail:      r.thumbnail_url || r.poster_url || null,
    thumbnail_url:  r.thumbnail_url || null,
    poster_url:     r.poster_url    || null,
    cf_video_uid:   r.cf_video_uid  || null,
    genre,
    duration,
    duration_seconds: r.duration_seconds || null,
    views:          r.views         || 0,
    likes:          r.likes         || 0,
    shares:         r.shares        || 0,
    saves:          r.saves         || 0,
    comments_count: r.comments_count || 0,
    isLive:         false,
    isFeatured:     r.is_featured   || false,
    creator_name:   r.creator_name  || null,
    creator_avatar: r.creator_avatar || null,
    trending_score: r.trending_score || 0,
    slug:           r.slug          || null,
  };
}

// ─── Movies ───────────────────────────────────────────────────────────────────

export const movieService = {
  async getFeatured() {
    // Use trending endpoint — pick the top result as the featured hero item
    const data = await apiFetch("/movies/trending", { auth: false });
    const movies = Array.isArray(data) ? data : [];
    // Pick highest popularity as hero, ensure it has a backdrop for the banner
    const featured =
      movies.find((m) => m.backdrop_url) || movies[0] || null;
    return normaliseMovie(featured);
  },

  async getAll({ genre, sort, page = 1, limit = 20 } = {}) {
    const sortMap = { views: "popularity", year: "release_year", default: "popularity" };
    const data = await apiFetch("/movies/", {
      params: {
        page,
        limit,
        sort: sortMap[sort] || "popularity",
        content_type: "movie",
        ...(genre ? { genre } : {}),
      },
      auth: false,
    });
    const movies = Array.isArray(data) ? data : [];
    return {
      data:  movies.map(normaliseMovie),
      total: movies.length,
    };
  },

  async getById(id) {
    const data = await apiFetch(`/movies/${id}`, { auth: false });
    return normaliseMovie(data);
  },

  async getTrending() {
    const data = await apiFetch("/movies/trending", { auth: false });
    return (Array.isArray(data) ? data : []).map(normaliseMovie);
  },

  async getNewReleases({ page = 1, limit = 20 } = {}) {
    const currentYear = new Date().getFullYear();
    const data = await apiFetch("/movies/new-releases", {
      params: { page, limit, year: currentYear },
      auth: false,
    });
    const movies = Array.isArray(data) ? data : [];
    // Fallback to previous year if empty
    if (movies.length === 0) {
      const fallback = await apiFetch("/movies/new-releases", {
        params: { page, limit, year: currentYear - 1 },
        auth: false,
      });
      return (Array.isArray(fallback) ? fallback : []).map(normaliseMovie);
    }
    return movies.map(normaliseMovie);
  },

  async getByGenre(genre, { page = 1, limit = 40 } = {}) {
    const data = await apiFetch(`/movies/by-genre/${encodeURIComponent(genre)}`, {
      params: { page, limit },
      auth: false,
    });
    return (Array.isArray(data) ? data : []).map(normaliseMovie);
  },

  async search(query) {
    if (!query?.trim()) return [];
    const data = await apiFetch("/movies/search/", {
      params: { q: query.trim() },
      auth: false,
    });
    return (Array.isArray(data) ? data : []).map(normaliseMovie);
  },

  async getStreamUrl(movieId) {
    return apiFetch(`/movies/stream/${movieId}`, { auth: true });
  },

  async getResumePosition(movieId) {
    const data = await apiFetch(`/movies/${movieId}/resume`, { auth: true });
    return data?.resume_from ?? 0;
  },

  async updateProgress(movieId, progressSeconds, completed = false) {
    return apiFetch("/watch-history/", {
      method: "POST",
      body: { movie_id: movieId, progress_seconds: progressSeconds, completed },
      auth: true,
    });
  },
};

// ─── Series ───────────────────────────────────────────────────────────────────

export const seriesService = {
  async getAll({ genre, sort, page = 1, limit = 20 } = {}) {
    const data = await apiFetch("/series/", {
      params: { page, limit, ...(genre ? { genre } : {}) },
      auth: false,
    });
    const series = Array.isArray(data) ? data : [];
    return {
      data:  series.map(normaliseMovie),
      total: series.length,
    };
  },

  async getById(id) {
    const data = await apiFetch(`/series/${id}`, { auth: false });
    if (!data) throw new Error("Series not found");

    const normalised = normaliseMovie(data);

    // seasons is an array of { season_number, episodes[] } from the backend
    return {
      ...normalised,
      seasonData: data.seasons || [],
      related:    [],
    };
  },

  async getSeasonEpisodes(seriesId, seasonNumber) {
    const data = await apiFetch(`/series/${seriesId}/season/${seasonNumber}`, {
      auth: false,
    });
    return Array.isArray(data) ? data : [];
  },
};

// ─── Reels ────────────────────────────────────────────────────────────────────

export const reelsService = {
  async getAll({ page = 1, limit = 20, sort = "trending", genre, category } = {}) {
    const data = await apiFetch("/reels/", {
      params: {
        page,
        limit,
        sort,
        ...(genre    ? { genre }    : {}),
        ...(category ? { category } : {}),
      },
      auth: false,
    });
    const reels = Array.isArray(data) ? data : [];
    return {
      data:    reels.map(normaliseReel),
      total:   reels.length,
      hasMore: reels.length === limit,
    };
  },

  async getTrending() {
    const data = await apiFetch("/reels/trending", { auth: false });
    return (Array.isArray(data) ? data : []).map(normaliseReel);
  },

  async getFeatured() {
    const data = await apiFetch("/reels/featured", { auth: false });
    return (Array.isArray(data) ? data : []).map(normaliseReel);
  },

  async getById(id) {
    const data = await apiFetch(`/reels/${id}`, { auth: false });
    return normaliseReel(data);
  },

  async getStreamUrl(reelId) {
    // Stream URLs are auth-gated even if public — never cache
    return apiFetch(`/reels/stream/${reelId}`, { auth: false });
  },

  async likeReel(id) {
    return apiFetch(`/reels/${id}/like`, { method: "POST", auth: true });
  },

  async saveReel(id) {
    return apiFetch(`/reels/${id}/save`, { method: "POST", auth: true });
  },

  async recordView(id) {
    return apiFetch(`/reels/${id}/view`, { method: "POST", auth: false }).catch(() => {});
  },

  async recordShare(id) {
    return apiFetch(`/reels/${id}/share`, { method: "POST", auth: false }).catch(() => {});
  },

  async getComments(id, { page = 1, limit = 30 } = {}) {
    const data = await apiFetch(`/reels/${id}/comments`, {
      params: { page, limit },
      auth: false,
    });
    return Array.isArray(data) ? data : [];
  },

  async postComment(id, content) {
    return apiFetch(`/reels/${id}/comments`, {
      method: "POST",
      body: { content: content.trim() },
      auth: true,
    });
  },
};

// ─── Live Events ──────────────────────────────────────────────────────────────
// Note: no dedicated /live endpoint in backend yet — using movies with a live flag

export const liveService = {
  async getAll() {
    // Placeholder until a /live router is added to the backend
    return { live: [], upcoming: [] };
  },
};

// ─── Kids ─────────────────────────────────────────────────────────────────────

export const kidsService = {
  async getAll({ page = 1, limit = 40 } = {}) {
    // Filter movies by kids-friendly genres
    const data = await apiFetch("/movies/by-genre/Kids", {
      params: { page, limit },
      auth: false,
    }).catch(() => []);
    return (Array.isArray(data) ? data : []).map(normaliseMovie);
  },
};

// ─── Watch History ────────────────────────────────────────────────────────────

export const watchHistoryService = {
  async getAll({ limit = 20 } = {}) {
    const data = await apiFetch("/watch-history/", {
      params: { limit },
      auth: true,
    });
    return Array.isArray(data) ? data : [];
  },
};

// ─── Recommendations ──────────────────────────────────────────────────────────

export const recommendationService = {
  async getPersonalised({ page = 1, limit = 20 } = {}) {
    try {
      const data = await apiFetch("/movies/recommendations", {
        params: { page, limit },
        auth: true,
      });
      return (Array.isArray(data) ? data : []).map(normaliseMovie);
    } catch {
      // Fallback to trending if user has no history / not authenticated
      return movieService.getTrending();
    }
  },
};

// ─── Search ───────────────────────────────────────────────────────────────────

export const searchService = {
  async search(query) {
    if (!query?.trim()) return [];
    const [movies, reels] = await Promise.allSettled([
      movieService.search(query),
      reelsService.getAll({ limit: 10 }).then((r) =>
        r.data.filter((reel) =>
          reel.title.toLowerCase().includes(query.toLowerCase())
        )
      ),
    ]);
    return [
      ...(movies.status === "fulfilled" ? movies.value : []),
      ...(reels.status  === "fulfilled" ? reels.value  : []),
    ];
  },
};

// ─── Homepage rows ────────────────────────────────────────────────────────────
// Builds the homepage content rows by fetching multiple endpoints in parallel

export const homepageService = {
  async getRows() {
    const [trending, newReleases, series, reels] = await Promise.allSettled([
      movieService.getTrending(),
      movieService.getNewReleases({ limit: 20 }),
      seriesService.getAll({ limit: 20 }).then((r) => r.data),
      reelsService.getAll({ limit: 10 }).then((r) => r.data),
    ]);

    const rows = [];

    if (trending.status === "fulfilled" && trending.value.length > 0) {
      rows.push({
        id:    "trending",
        title: "Trending Now",
        type:  "movies",
        items: trending.value,
      });
    }

    if (newReleases.status === "fulfilled" && newReleases.value.length > 0) {
      rows.push({
        id:    "new-releases",
        title: "New Releases",
        type:  "movies",
        items: newReleases.value,
      });
    }

    if (series.status === "fulfilled" && series.value.length > 0) {
      rows.push({
        id:    "series",
        title: "Series & Shows",
        type:  "series",
        items: series.value,
      });
    }

    if (reels.status === "fulfilled" && reels.value.length > 0) {
      rows.push({
        id:    "reels",
        title: "Reels",
        type:  "reels",
        items: reels.value,
      });
    }

    return rows;
  },
};