import PageHeader from "@/components/common/PageHeader";
import MyBookingsContent from "@/components/rooms/MyBookingsContent";

export const metadata = {
  title: "StudyNook – My Bookings",
  description:
    "View, manage, or cancel your upcoming and past library study room reservations.",
};

export default function MyBookingsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        badge="Reservation History"
        title="My Bookings"
        description="Review all your past and upcoming library study sanctuary bookings. Cancel active reservations anytime before your scheduled session."
      />
      <MyBookingsContent />
    </div>
  );
}
