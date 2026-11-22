"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "studynook_user";
const DEFAULT_PHOTO_URL =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user from localStorage on initial client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          setUser(parsed);
        }
      }
    } catch {
      // Ignore parse/storage errors on restore
    } finally {
      setIsLoading(false);
    }
  }, []);

  // MOCK: replace with API call
  const login = async (email, password) => {
    if (!password || email === "wrong@test.com") {
      return { success: false, error: "Invalid email or password" };
    }

    const derivedName = email
      ? email
          .split("@")[0]
          .replace(/[._-]/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      : "Study Member";

    const authenticatedUser = {
      name: derivedName,
      email,
      photoURL: DEFAULT_PHOTO_URL,
    };

    setUser(authenticatedUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
    } catch {
      // Storage unavailable or quota exceeded
    }
    return { success: true, user: authenticatedUser };
  };

  // MOCK: replace with API call
  const register = async (data) => {
    if (!data?.email) {
      return { success: false, error: "Email is required" };
    }

    return { success: true };
  };

  // MOCK: replace with API call
  const googleLogin = async () => {
    const googleUser = {
      name: "Google User",
      email: "google.user@gmail.com",
      photoURL: DEFAULT_PHOTO_URL,
    };

    setUser(googleUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(googleUser));
    } catch {
      // Storage unavailable or quota exceeded
    }
    return { success: true, user: googleUser };
  };

  // MOCK: replace with API call
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage unavailable
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
