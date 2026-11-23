"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AmenityChips from "@/components/rooms/AmenityChips";
import BookingModal from "@/components/rooms/BookingModal";
import EditRoomModal from "@/components/rooms/EditRoomModal";
import ConfirmModal from "@/components/common/ConfirmModal";
import { Button } from "@heroui/react";
import {
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
  HiOutlineBookmarkSquare,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import toast from "react-hot-toast";

export default function RoomDetailsContent({ initialRoom }) {
  const router = useRouter();
  const { user } = useAuth();
  const [room, setRoom] = useState(initialRoom);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = Boolean(user && user.email === room.ownerEmail);

  // Owner Delete Action
  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    // MOCK: replace with API call
    await new Promise((resolve) => setTimeout(resolve, 350));
    setIsDeleting(false);
    setIsDeleteOpen(false);
    toast.success("Room deleted successfully");
    router.push("/my-listings");
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Breadcrumb & Owner Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted">
          <Link href="/rooms" className="hover:text-primary transition-colors">
            All Rooms
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-xs sm:max-w-md">
            {room.name}
          </span>
        </div>

        {isOwner && (
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onPress={() => setIsEditOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border-border hover:bg-surface-raised text-foreground font-medium text-xs h-9 px-3.5"
            >
              <HiOutlinePencilSquare className="w-4 h-4 text-primary" />
              <span>Edit Room</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onPress={() => setIsDeleteOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border-danger/30 text-danger hover:bg-danger/10 font-medium text-xs h-9 px-3.5"
            >
              <HiOutlineTrash className="w-4 h-4" />
              <span>Delete</span>
            </Button>
          </div>
        )}
      </div>

      {/* Main Grid: Details Left, Booking Summary Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Room Main Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border shadow-sm bg-muted/20">
            <Image
              src={room.image}
              alt={room.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="rounded-full bg-surface/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-foreground shadow-sm border border-border/60">
                {room.floor}
              </span>
              <span className="rounded-full bg-primary/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-sm">
                ${room.hourlyRate}/hr
              </span>
            </div>
          </div>

          {/* Room Title & Key Stats */}
          <div className="space-y-4">
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {room.name}
            </h1>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm text-muted">
              <div className="flex items-center gap-1.5">
                <HiOutlineBuildingOffice2 className="w-4 h-4 text-primary" />
                <span>{room.floor}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineUserGroup className="w-4 h-4 text-primary" />
                <span>
                  Capacity: {room.capacity?.min}–{room.capacity?.max} people
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineBookmarkSquare className="w-4 h-4 text-primary" />
                <span>Booked {room.bookingCount} times</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineUser className="w-4 h-4 text-primary" />
                <span>Hosted by {room.ownerName}</span>
              </div>
            </div>
          </div>

          {/* Room Description */}
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              About This Space
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed whitespace-pre-line">
              {room.description}
            </p>
          </div>

          {/* Amenities Section */}
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Included Amenities & Equipment
            </h2>
            <AmenityChips amenities={room.amenities} maxVisible={10} />
          </div>

          {/* Study Guidelines / Rules */}
          <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
            <h2 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
              <HiOutlineShieldCheck className="w-5 h-5 text-primary" />
              <span>Room Policies & Library Etiquette</span>
            </h2>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2">
                <HiOutlineCheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Please leave the space clean and return furniture to its original layout.</span>
              </li>
              <li className="flex items-start gap-2">
                <HiOutlineCheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Maintain noise levels appropriate for the zone (whisper in quiet areas).</span>
              </li>
              <li className="flex items-start gap-2">
                <HiOutlineCheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Covered beverages allowed; please dispose of food outside the study rooms.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Sticky Booking Card */}
        <aside className="lg:col-span-1 lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-md space-y-6">
            {/* Header: Pricing */}
            <div className="flex items-baseline justify-between border-b border-border pb-4">
              <div>
                <span className="text-3xl font-bold font-mono text-primary">
                  ${room.hourlyRate}
                </span>
                <span className="text-sm text-muted font-medium ml-1">/ hour</span>
              </div>
              <span className="text-xs font-semibold text-success bg-success/10 px-2.5 py-1 rounded-full">
                Instant Booking
              </span>
            </div>

            {/* Quick Summary Highlights */}
            <div className="space-y-2.5 text-xs sm:text-sm text-muted">
              <div className="flex justify-between py-1 border-b border-border/50">
                <span>Location</span>
                <strong className="text-foreground">{room.floor}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span>Max Capacity</span>
                <strong className="text-foreground">{room.capacity?.max} People</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span>Cleaning Fee</span>
                <strong className="text-foreground">$0 (Included)</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Cancellation</span>
                <strong className="text-success">Free before session</strong>
              </div>
            </div>

            {/* Main Action Button */}
            {user ? (
              <Button
                variant="primary"
                fullWidth
                onPress={() => setIsBookingOpen(true)}
                className="rounded-xl py-3 text-base font-semibold shadow-md"
              >
                Book Now
              </Button>
            ) : (
              <Link
                href={`/login?redirect=/rooms/${room.id}`}
                className="flex items-center justify-center w-full rounded-xl bg-primary px-4 py-3 text-base font-semibold text-white shadow-md hover:bg-primary-hover transition-colors"
              >
                Login to Book
              </Link>
            )}

            <p className="text-center text-xs text-muted leading-relaxed">
              No immediate card payment required. Bookings are confirmed instantly.
            </p>
          </div>
        </aside>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        room={room}
      />

      {/* Edit Room Modal (for owner) */}
      {isOwner && (
        <EditRoomModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          room={room}
          onSaveSuccess={(updated) => setRoom(updated)}
        />
      )}

      {/* Delete Confirmation Modal (for owner) */}
      {isOwner && (
        <ConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Study Room"
          message={`Are you sure you want to permanently delete "${room.name}"? This action cannot be undone.`}
          confirmText="Delete Room"
          cancelText="Keep Room"
          variant="danger"
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
