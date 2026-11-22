import PageHeader from "@/components/common/PageHeader";

export const metadata = {
  title: "StudyNook – My Bookings",
};

export default function MyBookingsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="My Bookings"
        description="View, manage, or cancel your upcoming and past study room reservations."
        badge="Reservation History"
      />
    </div>
  );
}
