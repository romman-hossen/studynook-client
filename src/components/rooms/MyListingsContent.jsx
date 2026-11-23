"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { rooms as initialRooms } from "@/data/rooms";
import EditRoomModal from "@/components/rooms/EditRoomModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import EmptyState from "@/components/common/EmptyState";
import { Button } from "@heroui/react";
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlinePlus,
  HiOutlineBuildingOffice2,
  HiOutlineBookmarkSquare,
  HiOutlineInbox,
} from "react-icons/hi2";
import toast from "react-hot-toast";

export default function MyListingsContent() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userRooms, setUserRooms] = useState([]);

  // Modals state
  const [editingRoom, setEditingRoom] = useState(null);
  const [deletingRoom, setDeletingRoom] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize rooms filtered by owner email, with simulated 500ms skeleton
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (user?.email) {
        // Filter rooms matching the logged-in user
        const matched = initialRooms.filter(
          (r) => r.ownerEmail.toLowerCase() === user.email.toLowerCase()
        );
        setUserRooms(matched);
      } else {
        setUserRooms([]);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [user]);

  // Handle Edit Save
  const handleEditSave = (updatedRoom) => {
    setUserRooms((prev) =>
      prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r))
    );
    setEditingRoom(null);
  };

  // Handle Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!deletingRoom) return;
    setIsDeleting(true);
    // MOCK: replace with API call
    await new Promise((resolve) => setTimeout(resolve, 350));

    setUserRooms((prev) => prev.filter((r) => r.id !== deletingRoom.id));
    setIsDeleting(false);
    setDeletingRoom(null);
    toast.success("Room deleted successfully");
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Desktop Table Skeleton */}
        <div className="hidden md:block rounded-2xl border border-border bg-surface overflow-hidden p-4 shadow-sm animate-pulse">
          <div className="h-10 bg-muted/10 rounded-xl mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted/10 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Mobile Cards Skeleton */}
        <div className="md:hidden space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-surface p-4 space-y-3 animate-pulse"
            >
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-xl bg-muted/20" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted/20 rounded w-3/4" />
                  <div className="h-3 bg-muted/10 rounded w-1/2" />
                </div>
              </div>
              <div className="h-8 bg-muted/10 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (userRooms.length === 0) {
    return (
      <EmptyState
        icon={<HiOutlineInbox className="h-8 w-8" />}
        title="You haven't listed any rooms yet"
        message="Turn your empty room, quiet workspace, or multimedia studio into a campus resource for other students."
        action={{
          label: "Add Room",
          href: "/add-room",
        }}
        className="py-16 sm:py-20"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-muted">
          Managing{" "}
          <strong className="text-foreground font-semibold">
            {userRooms.length}
          </strong>{" "}
          {userRooms.length === 1 ? "room listing" : "room listings"}
        </p>

        <Link
          href="/add-room"
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
        >
          <HiOutlinePlus className="w-4 h-4" />
          <span>Add New Room</span>
        </Link>
      </div>

      {/* Desktop: Clean Table Layout */}
      <div className="hidden md:block rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/5 text-xs font-semibold uppercase tracking-wider text-muted">
              <th className="py-3.5 px-6">Room</th>
              <th className="py-3.5 px-4">Floor</th>
              <th className="py-3.5 px-4">Rate</th>
              <th className="py-3.5 px-4">Bookings</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {userRooms.map((room) => (
              <tr
                key={room.id}
                className="hover:bg-muted/5 transition-colors group"
              >
                {/* Thumbnail & Name */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-muted/20">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/rooms/${room.id}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                      >
                        {room.name}
                      </Link>
                      <span className="text-xs text-muted">
                        Cap: {room.capacity?.min}–{room.capacity?.max} people
                      </span>
                    </div>
                  </div>
                </td>

                {/* Floor */}
                <td className="py-4 px-4 text-muted font-medium">
                  {room.floor}
                </td>

                {/* Hourly Rate */}
                <td className="py-4 px-4 font-mono font-semibold text-primary">
                  ${room.hourlyRate}/hr
                </td>

                {/* Bookings Count */}
                <td className="py-4 px-4 text-muted">
                  <span className="inline-flex items-center gap-1">
                    <HiOutlineBookmarkSquare className="w-4 h-4 text-primary" />
                    <span>{room.bookingCount}</span>
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/rooms/${room.id}`}
                      className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-muted/10 transition-colors"
                      title="View Details"
                    >
                      <HiOutlineEye className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setEditingRoom(room)}
                      className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                      title="Edit Room"
                    >
                      <HiOutlinePencilSquare className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingRoom(room)}
                      className="p-2 rounded-lg text-muted hover:text-danger hover:bg-danger/10 transition-colors cursor-pointer"
                      title="Delete Room"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Stacked Cards */}
      <div className="md:hidden space-y-4">
        {userRooms.map((room) => (
          <div
            key={room.id}
            className="rounded-2xl border border-border bg-surface p-4 shadow-sm space-y-3"
          >
            {/* Top Info */}
            <div className="flex gap-3.5 items-start">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-muted/20">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/rooms/${room.id}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors text-sm line-clamp-1"
                >
                  {room.name}
                </Link>
                <div className="flex items-center gap-3 text-xs text-muted mt-1">
                  <span>{room.floor}</span>
                  <span>•</span>
                  <span className="font-mono font-semibold text-primary">
                    ${room.hourlyRate}/hr
                  </span>
                </div>
                <div className="text-xs text-muted mt-0.5">
                  Booked {room.bookingCount} times
                </div>
              </div>
            </div>

            {/* Mobile Actions Toolbar */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Link
                href={`/rooms/${room.id}`}
                className="flex items-center gap-1 text-xs font-medium text-muted hover:text-foreground px-2.5 py-1.5 rounded-lg border border-border hover:bg-muted/10 transition-colors"
              >
                <HiOutlineEye className="w-3.5 h-3.5" />
                <span>View</span>
              </Link>

              <Button
                variant="outline"
                size="sm"
                onPress={() => setEditingRoom(room)}
                className="flex items-center gap-1 text-xs font-medium text-foreground border-border hover:bg-surface-raised px-2.5 py-1.5 rounded-lg h-auto"
              >
                <HiOutlinePencilSquare className="w-3.5 h-3.5 text-primary" />
                <span>Edit</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onPress={() => setDeletingRoom(room)}
                className="flex items-center gap-1 text-xs font-medium text-danger border-danger/30 hover:bg-danger/10 px-2.5 py-1.5 rounded-lg h-auto"
              >
                <HiOutlineTrash className="w-3.5 h-3.5" />
                <span>Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Room Modal */}
      {editingRoom && (
        <EditRoomModal
          isOpen={Boolean(editingRoom)}
          onClose={() => setEditingRoom(null)}
          room={editingRoom}
          onSaveSuccess={handleEditSave}
        />
      )}

      {/* Confirm Delete Modal */}
      {deletingRoom && (
        <ConfirmModal
          isOpen={Boolean(deletingRoom)}
          onClose={() => setDeletingRoom(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete Study Room"
          message={`Are you sure you want to remove "${deletingRoom.name}"? This action will permanently remove it from your listings.`}
          confirmText="Delete Room"
          cancelText="Cancel"
          variant="danger"
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
