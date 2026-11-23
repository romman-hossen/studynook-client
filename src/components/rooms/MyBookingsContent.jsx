"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { bookings as initialBookings } from "@/data/bookings";
import { rooms } from "@/data/rooms";
import StatusBadge from "@/components/common/StatusBadge";
import ConfirmModal from "@/components/common/ConfirmModal";
import EmptyState from "@/components/common/EmptyState";
import { Button } from "@heroui/react";
import {
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineXMark,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineBookmarkSlash,
} from "react-icons/hi2";
import toast from "react-hot-toast";

export default function MyBookingsContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingList, setBookingList] = useState([]);
  const [cancellingBooking, setCancellingBooking] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Today's date string YYYY-MM-DD for comparison
  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // Join bookings with rooms data & simulate ~500ms skeleton
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Map room metadata (image, floor, etc.)
      const joined = initialBookings.map((b) => {
        const room = rooms.find((r) => r.id === b.roomId);
        return {
          ...b,
          roomImage:
            room?.image ||
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
          roomName: room?.name || b.roomName,
          floor: room?.floor || "Floor 1",
        };
      });

      setBookingList(joined);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Check if booking is eligible for cancellation (confirmed AND today or in the future)
  const isCancellable = (booking) => {
    return (
      booking.status?.toLowerCase() === "confirmed" &&
      booking.date >= todayStr
    );
  };

  // Confirm cancel action
  const handleCancelConfirm = async () => {
    if (!cancellingBooking) return;
    setIsCancelling(true);
    // MOCK: replace with API call
    await new Promise((resolve) => setTimeout(resolve, 350));

    setBookingList((prev) =>
      prev.map((b) =>
        b.id === cancellingBooking.id ? { ...b, status: "cancelled" } : b
      )
    );

    setIsCancelling(false);
    setCancellingBooking(null);
    toast.success("Booking cancelled");
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

  if (bookingList.length === 0) {
    return (
      <EmptyState
        icon={<HiOutlineBookmarkSlash className="h-8 w-8" />}
        title="You have no bookings yet"
        message="Reserve a quiet study sanctuary, collaboration pod, or presentation suite for your upcoming academic sessions."
        action={{
          label: "Browse Rooms",
          href: "/rooms",
        }}
        className="py-16 sm:py-20"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header Counter */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-muted">
          Showing{" "}
          <strong className="text-foreground font-semibold">
            {bookingList.length}
          </strong>{" "}
          {bookingList.length === 1 ? "reservation" : "reservations"}
        </p>

        <Link
          href="/rooms"
          className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-1"
        >
          <span>Find more rooms</span>
          <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/5 text-xs font-semibold uppercase tracking-wider text-muted">
              <th className="py-3.5 px-6">Study Room</th>
              <th className="py-3.5 px-4">Date & Time</th>
              <th className="py-3.5 px-4">Cost</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-6">Note</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {bookingList.map((booking) => {
              const cancellable = isCancellable(booking);

              return (
                <tr
                  key={booking.id}
                  className="hover:bg-muted/5 transition-colors group"
                >
                  {/* Room Thumbnail & Title */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-muted/20">
                        <Image
                          src={booking.roomImage}
                          alt={booking.roomName}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/rooms/${booking.roomId}`}
                          className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                        >
                          {booking.roomName}
                        </Link>
                        <span className="text-xs text-muted">
                          {booking.floor}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="py-4 px-4 text-muted">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <HiOutlineCalendarDays className="w-4 h-4 text-primary shrink-0" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted">
                        <HiOutlineClock className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {booking.startTime} – {booking.endTime}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Total Cost */}
                  <td className="py-4 px-4 font-mono font-semibold text-primary">
                    ${booking.totalCost}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    <StatusBadge status={booking.status} />
                  </td>

                  {/* Special Note */}
                  <td className="py-4 px-6 max-w-xs">
                    {booking.note ? (
                      <p
                        className="text-xs text-muted line-clamp-2"
                        title={booking.note}
                      >
                        {booking.note}
                      </p>
                    ) : (
                      <span className="text-xs text-muted/60 italic">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    {cancellable ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onPress={() => setCancellingBooking(booking)}
                        className="rounded-xl border-danger/30 text-danger hover:bg-danger/10 text-xs font-semibold px-3 py-1.5 h-auto transition-colors"
                      >
                        Cancel
                      </Button>
                    ) : (
                      <span className="text-xs text-muted/50 font-medium">
                        {booking.status === "cancelled" ? "Cancelled" : "Completed"}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards Layout */}
      <div className="md:hidden space-y-4">
        {bookingList.map((booking) => {
          const cancellable = isCancellable(booking);

          return (
            <div
              key={booking.id}
              className="rounded-2xl border border-border bg-surface p-4 shadow-sm space-y-3"
            >
              {/* Room Header */}
              <div className="flex gap-3.5 items-start">
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-muted/20">
                  <Image
                    src={booking.roomImage}
                    alt={booking.roomName}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/rooms/${booking.roomId}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors text-sm line-clamp-1"
                    >
                      {booking.roomName}
                    </Link>
                    <StatusBadge status={booking.status} />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted mt-1.5">
                    <span className="font-medium text-foreground">{booking.date}</span>
                    <span>•</span>
                    <span>{booking.startTime}–{booking.endTime}</span>
                  </div>

                  <div className="text-xs font-mono font-semibold text-primary mt-1">
                    Total: ${booking.totalCost}
                  </div>
                </div>
              </div>

              {/* Special Note if Present */}
              {booking.note && (
                <div className="rounded-xl bg-muted/5 p-2.5 text-xs text-muted border border-border/60">
                  <span className="font-semibold text-foreground">Note: </span>
                  {booking.note}
                </div>
              )}

              {/* Mobile Actions Toolbar */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <Link
                  href={`/rooms/${booking.roomId}`}
                  className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Room details</span>
                  <HiOutlineArrowTopRightOnSquare className="w-3.5 h-3.5" />
                </Link>

                {cancellable ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={() => setCancellingBooking(booking)}
                    className="rounded-lg border-danger/30 text-danger hover:bg-danger/10 text-xs font-semibold px-3 py-1 h-auto"
                  >
                    Cancel Booking
                  </Button>
                ) : (
                  <span className="text-xs text-muted/60">
                    {booking.status === "cancelled" ? "Cancelled" : "Past session"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cancel Booking Confirmation Modal */}
      {cancellingBooking && (
        <ConfirmModal
          isOpen={Boolean(cancellingBooking)}
          onClose={() => setCancellingBooking(null)}
          onConfirm={handleCancelConfirm}
          title="Cancel Reservation"
          message={`Are you sure you want to cancel your reservation for "${cancellingBooking.roomName}" on ${cancellingBooking.date} (${cancellingBooking.startTime} - ${cancellingBooking.endTime})?`}
          confirmText="Yes, Cancel Booking"
          cancelText="Keep Reservation"
          variant="danger"
          isLoading={isCancelling}
        />
      )}
    </div>
  );
}
