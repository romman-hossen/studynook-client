import PageHeader from "@/components/common/PageHeader";

export const metadata = {
  title: "StudyNook – My Listings",
};

export default function MyListingsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="My Room Listings"
        description="Manage and monitor your submitted study rooms and their availability."
        badge="Room Management"
      />
    </div>
  );
}
