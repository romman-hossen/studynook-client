"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import PublicNav from "./PublicNav";
import PrivateNav from "./PrivateNav";
import ProfileMenu from "./ProfileMenu";
import ThemeToggle from "./ThemeToggle";
import { HiOutlineBookOpen, HiBars3, HiXMark } from "react-icons/hi2";

function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 select-none">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <HiOutlineBookOpen className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            Study<span className="text-primary">Nook</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="h-4 w-16 rounded bg-muted/20 animate-pulse" />
          <div className="h-4 w-16 rounded bg-muted/20 animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl border border-border bg-surface/50" />
          <div className="h-9 w-24 rounded-xl bg-muted/20 animate-pulse" />
        </div>
      </div>
    </header>
  );
}

function NavbarContent() {
  const { user, isLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMobile = () => setMobileMenuOpen(false);

  const isHomeActive = pathname === "/";
  const isRoomsActive = pathname === "/rooms" || pathname.startsWith("/rooms/");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/90 backdrop-blur-md transition-colors">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={closeMobile}
          className="flex items-center gap-2.5 group select-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <HiOutlineBookOpen className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            Study<span className="text-primary">Nook</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="h-4 w-16 rounded bg-muted/20 animate-pulse" />
              <div className="h-4 w-16 rounded bg-muted/20 animate-pulse" />
            </div>
          ) : user ? (
            <PrivateNav />
          ) : (
            <PublicNav />
          )}
        </div>

        {/* Desktop Right Controls (Theme + Auth) */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {isLoading ? (
            <div className="h-9 w-24 rounded-xl bg-muted/20 animate-pulse" />
          ) : user ? (
            <ProfileMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-focus"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Controls: Theme Toggle & Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-muted/10 focus-visible:outline-2 focus-visible:outline-focus"
          >
            {mobileMenuOpen ? (
              <HiXMark className="h-5 w-5" />
            ) : (
              <HiBars3 className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-surface/98 px-4 py-5 shadow-lg md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={closeMobile}
              className={`rounded-xl px-3.5 py-2.5 text-base transition-colors ${
                isHomeActive
                  ? "bg-primary/10 font-semibold text-primary"
                  : "font-medium text-foreground hover:bg-muted/10"
              }`}
            >
              Home
            </Link>
            <Link
              href="/rooms"
              onClick={closeMobile}
              className={`rounded-xl px-3.5 py-2.5 text-base transition-colors ${
                isRoomsActive
                  ? "bg-primary/10 font-semibold text-primary"
                  : "font-medium text-foreground hover:bg-muted/10"
              }`}
            >
              Rooms
            </Link>

            {user && (
              <>
                <Link
                  href="/add-room"
                  onClick={closeMobile}
                  className={`rounded-xl px-3.5 py-2.5 text-base transition-colors ${
                    pathname === "/add-room"
                      ? "bg-primary/10 font-semibold text-primary"
                      : "font-medium text-foreground hover:bg-muted/10"
                  }`}
                >
                  Add Room
                </Link>
                <Link
                  href="/my-listings"
                  onClick={closeMobile}
                  className={`rounded-xl px-3.5 py-2.5 text-base transition-colors ${
                    pathname === "/my-listings"
                      ? "bg-primary/10 font-semibold text-primary"
                      : "font-medium text-foreground hover:bg-muted/10"
                  }`}
                >
                  My Listings
                </Link>
                <Link
                  href="/my-bookings"
                  onClick={closeMobile}
                  className={`rounded-xl px-3.5 py-2.5 text-base transition-colors ${
                    pathname === "/my-bookings"
                      ? "bg-primary/10 font-semibold text-primary"
                      : "font-medium text-foreground hover:bg-muted/10"
                  }`}
                >
                  My Bookings
                </Link>
              </>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            {isLoading ? (
              <div className="h-10 w-full rounded-xl bg-muted/20 animate-pulse" />
            ) : user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-1">
                  <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeMobile();
                    logout();
                  }}
                  className="w-full rounded-xl border border-danger/30 bg-danger/10 px-4 py-2.5 text-center text-sm font-medium text-danger transition-colors hover:bg-danger/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="w-full rounded-xl border border-border py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={closeMobile}
                  className="w-full rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <NavbarContent />
    </Suspense>
  );
}
