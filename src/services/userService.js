// ─── GoFlix User Service ─────────────────────────────────────────────────────
// Watchlist + Watch History + Auth service layer (mock → real swap)

const WATCHLIST_KEY = "goflix_watchlist";
const HISTORY_KEY = "goflix_watch_history";
const TOKEN_KEY = "goflix_token";
const USER_KEY = "goflix_user";

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

// ─── Auth Service ─────────────────────────────────────────────────────────────
export const authService = {
  async login(email, password) {
    await delay(800);
    // Mock auth — replace with: return apiClient.post('/auth/login', { email, password })
    if (!email || !password) throw new Error("Email and password are required");
    const mockUser = {
      id: "usr_" + Math.random().toString(36).slice(2),
      email,
      name: email.split("@")[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split("@")[0])}&background=B30000&color=fff`,
      plan: "premium",
      joinedAt: new Date().toISOString(),
    };
    const mockToken = "mock_jwt_" + Math.random().toString(36).slice(2);
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    }
    return { user: mockUser, token: mockToken };
  },

  async register(name, email, password) {
    await delay(1000);
    // Mock register — replace with: return apiClient.post('/auth/register', { name, email, password })
    if (!name || !email || !password)
      throw new Error("All fields are required");
    const mockUser = {
      id: "usr_" + Math.random().toString(36).slice(2),
      email,
      name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=B30000&color=fff`,
      plan: "free",
      joinedAt: new Date().toISOString(),
    };
    const mockToken = "mock_jwt_" + Math.random().toString(36).slice(2);
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    }
    return { user: mockUser, token: mockToken };
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  getStoredUser() {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  getToken() {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};

// ─── Watchlist Service ────────────────────────────────────────────────────────
export const watchlistService = {
  getWatchlist() {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "[]");
    } catch {
      return [];
    }
  },

  async addToWatchlist(contentId, contentData) {
    await delay(200);
    const list = this.getWatchlist();
    if (!list.find((item) => item.id === contentId)) {
      const updated = [
        { ...contentData, addedAt: new Date().toISOString() },
        ...list,
      ];
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
    }
    return this.getWatchlist();
  },

  async removeFromWatchlist(contentId) {
    await delay(200);
    const list = this.getWatchlist().filter((item) => item.id !== contentId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
    return list;
  },

  isInWatchlist(contentId) {
    return this.getWatchlist().some((item) => item.id === contentId);
  },
};

// ─── Watch History Service ────────────────────────────────────────────────────
export const watchHistoryService = {
  getHistory() {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    } catch {
      return [];
    }
  },

  async saveProgress(contentId, contentData, progressSeconds, duration) {
    await delay(100);
    const history = this.getHistory();
    const existing = history.findIndex((h) => h.id === contentId);
    const entry = {
      ...contentData,
      progressSeconds,
      durationSeconds: duration,
      progress: duration ? Math.round((progressSeconds / duration) * 100) : 0,
      updatedAt: new Date().toISOString(),
    };
    if (existing >= 0) {
      history[existing] = entry;
    } else {
      history.unshift(entry);
    }
    const trimmed = history.slice(0, 20);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
    return trimmed;
  },

  getProgress(contentId) {
    const item = this.getHistory().find((h) => h.id === contentId);
    return item ? item.progressSeconds : 0;
  },
};
