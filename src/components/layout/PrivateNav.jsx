"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PrivateNav({ onLinkClick }) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", isActive: pathname === "/" },
    {
      href: "/rooms",
      label: "Rooms",
      isActive: pathname === "/rooms" || pathname.startsWith("/rooms/"),
    },
    {
      href: "/add-room",
      label: "Add Room",
      isActive: pathname === "/add-room",
    },
    {
      href: "/my-listings",
      label: "My Listings",
      isActive: pathname === "/my-listings",
    },
    {
      href: "/my-bookings",
      label: "My Bookings",
      isActive: pathname === "/my-bookings",
    },
  ];

  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={`rounded-xl px-3 py-2 text-sm transition-colors ${
            link.isActive
              ? "bg-primary/10 font-semibold text-primary"
              : "font-medium text-muted hover:text-foreground hover:bg-muted/5"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
