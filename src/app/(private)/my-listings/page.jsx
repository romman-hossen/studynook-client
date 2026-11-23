import PageHeader from "@/components/common/PageHeader";
import MyListingsContent from "@/components/rooms/MyListingsContent";

export const metadata = {
  title: "StudyNook – My Listings",
  description:
    "Manage your registered study rooms, monitor student bookings, and update availability.",
};

export default function MyListingsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        badge="Room Management"
        title="My Room Listings"
        description="Monitor, update, and manage your campus study spaces and availability in one place."
      />
      <MyListingsContent />
    </div>
  );
}
