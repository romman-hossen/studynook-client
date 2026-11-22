"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown, Avatar } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import {
  HiOutlineSquares2X2,
  HiOutlineBookmarkSquare,
  HiOutlineArrowRightOnRectangle,
  HiOutlineChevronDown,
} from "react-icons/hi2";

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!user) return null;

  const handleAction = (key) => {
    if (key === "my-listings") {
      router.push("/my-listings");
    } else if (key === "my-bookings") {
      router.push("/my-bookings");
    } else if (key === "logout") {
      logout();
      toast.success("Logged out successfully");
      router.push("/");
    }
  };

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-border bg-surface/80 p-1 pr-3 text-left transition hover:border-primary/40 hover:bg-muted/5 focus-visible:outline-2 focus-visible:outline-focus"
          aria-label="User profile menu"
        >
          <Avatar size="sm" className="h-8 w-8 rounded-full">
            <Avatar.Image
              src={user.photoURL}
              alt={user.name || "User avatar"}
              className="h-full w-full object-cover rounded-full"
            />
            <Avatar.Fallback className="bg-primary text-white text-xs font-semibold flex items-center justify-center rounded-full">
              {initial}
            </Avatar.Fallback>
          </Avatar>
          <span className="hidden max-w-[120px] truncate text-sm font-medium text-foreground sm:inline-block">
            {user.name}
          </span>
          <HiOutlineChevronDown className="h-3.5 w-3.5 text-muted transition-transform" />
        </button>
      </Dropdown.Trigger>

      <Dropdown.Popover
        placement="bottom end"
        className="w-56 rounded-2xl border border-border bg-surface p-1.5 shadow-xl backdrop-blur-md"
      >
        <Dropdown.Menu
          onAction={handleAction}
          className="flex flex-col gap-1 outline-none"
        >
          {/* User brief header */}
          <div className="px-3 py-2 border-b border-border/70 mb-1">
            <p className="text-sm font-semibold text-foreground truncate">
              {user.name}
            </p>
            <p className="text-xs text-muted truncate">{user.email}</p>
          </div>

          <Dropdown.Item
            id="my-listings"
            textValue="My Listings"
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors cursor-pointer ${
              pathname === "/my-listings"
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground hover:bg-muted/10"
            }`}
          >
            <HiOutlineSquares2X2 className="h-4 w-4 text-muted" />
            <span>My Listings</span>
          </Dropdown.Item>

          <Dropdown.Item
            id="my-bookings"
            textValue="My Bookings"
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors cursor-pointer ${
              pathname === "/my-bookings"
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground hover:bg-muted/10"
            }`}
          >
            <HiOutlineBookmarkSquare className="h-4 w-4 text-muted" />
            <span>My Bookings</span>
          </Dropdown.Item>

          <div className="my-1 border-t border-border/70" />

          <Dropdown.Item
            id="logout"
            textValue="Logout"
            variant="danger"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-danger hover:bg-danger/10 transition-colors cursor-pointer font-medium"
          >
            <HiOutlineArrowRightOnRectangle className="h-4 w-4 text-danger" />
            <span>Logout</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
