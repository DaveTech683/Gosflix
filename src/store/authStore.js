// src/store/authStore.js

import { create } from "zustand";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://goflix-production.up.railway.app";

const TOKEN_KEY = "goflix_token";
const USER_KEY  = "goflix_user";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Generate a deterministic UI-Avatars URL when no avatar_url is returned */
function fallbackAvatar(name) {
  const encoded = encodeURIComponent(name || "G");
  return `https://ui-avatars.com/api/?name=${encoded}&background=B30000&color=fff&size=128&bold=true&font-size=0.4`;
}

/** Normalise the raw /auth/me payload into our app's user shape */
function normaliseUser(profile) {
  const name = profile.display_name || profile.email;
  return {
    id:        profile.id,
    name,
    email:     profile.email,
    isAdmin:   profile.is_admin ?? false,
    is_admin:  profile.is_admin ?? false,
    plan:      profile.is_admin ? "Admin" : (profile.plan || "Free"),
    avatar:    profile.avatar_url || fallbackAvatar(name),
    // Map whichever timestamp field the backend returns
    joinedAt:  profile.created_at || profile.joined_at || profile.createdAt || new Date().toISOString(),
  };
}

// ─── Auth API calls ───────────────────────────────────────────────────────────

async function apiLogin(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (res.status === 401) {
    throw new Error("Incorrect email or password.");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.detail || "Login failed. Please try again.");
  }

  const data = await res.json();

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token ?? "",
    token_type: data.token_type,
  };
}

async function apiRegister(email, password, displayName) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method:      "POST",
    headers:     { "Content-Type": "application/json" },
    credentials: "include",
    body:        JSON.stringify({ email, password, display_name: displayName }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Registration failed");
  }
  return res.json();
}

async function apiGetMe(token) {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

async function apiLogout() {
  await fetch(`${BASE_URL}/auth/logout`, {
    method:      "POST",
    credentials: "include",
  }).catch(() => {});
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = create((set, get) => ({
  user:            null,
  isAuthenticated: false,
  isLoading:       false,
  isInitializing:  true,   // ← NEW: true until initialize() resolves
  error:           null,

  /**
   * Called once on app mount — restores session from localStorage,
   * then validates the token against /auth/me in the background.
   */
  initialize: async () => {
    if (typeof window === "undefined") {
      set({ isInitializing: false });
      return;
    }

    const token  = localStorage.getItem(TOKEN_KEY);
    const cached = localStorage.getItem(USER_KEY);

    if (!token) {
      set({ isInitializing: false });
      return;
    }

    // Immediately restore from cache so the UI doesn't flash unauthenticated
    if (cached) {
      try {
        set({ user: JSON.parse(cached), isAuthenticated: true });
      } catch { /* ignore corrupt cache */ }
    }

    // Validate token against /auth/me
    try {
      const profile = await apiGetMe(token);
      const user    = normaliseUser(profile);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: true });
    } catch {
      // Token invalid / expired — clear session
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isInitializing: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { access_token } = await apiLogin(email, password);
      localStorage.setItem(TOKEN_KEY, access_token);

      const profile = await apiGetMe(access_token);
      const user    = normaliseUser(profile);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { access_token } = await apiRegister(email, password, name);
      localStorage.setItem(TOKEN_KEY, access_token);

      const profile = await apiGetMe(access_token);
      const user    = normaliseUser(profile);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  },

  logout: async () => {
    await apiLogout();
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    set({ user: null, isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),
}));