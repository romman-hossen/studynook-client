"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({ className = "" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder to avoid hydration mismatch while preserving exact layout dimensions
    return (
      <div
        className={`h-9 w-9 rounded-xl border border-border bg-surface/50 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-muted/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-focus ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <FiSun className="h-4 w-4 transition-transform duration-200 rotate-0 text-amber-400" />
      ) : (
        <FiMoon className="h-4 w-4 transition-transform duration-200 rotate-0 text-slate-700 dark:text-slate-200" />
      )}
    </button>
  );
}
