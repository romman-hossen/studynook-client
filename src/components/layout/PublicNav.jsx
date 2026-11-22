"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PublicNav({ onLinkClick }) {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isRoomsActive = pathname === "/rooms" || pathname.startsWith("/rooms/");

  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      <Link
        href="/"
        onClick={onLinkClick}
        className={`rounded-xl px-3.5 py-2 text-sm transition-colors ${
          isHomeActive
            ? "bg-primary/10 font-semibold text-primary"
            : "font-medium text-muted hover:text-foreground hover:bg-muted/5"
        }`}
      >
        Home
      </Link>
      <Link
        href="/rooms"
        onClick={onLinkClick}
        className={`rounded-xl px-3.5 py-2 text-sm transition-colors ${
          isRoomsActive
            ? "bg-primary/10 font-semibold text-primary"
            : "font-medium text-muted hover:text-foreground hover:bg-muted/5"
        }`}
      >
        Rooms
      </Link>
    </nav>
  );
}
