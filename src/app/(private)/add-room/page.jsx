import PageHeader from "@/components/common/PageHeader";

export const metadata = {
  title: "StudyNook – Add Room",
};

export default function AddRoomPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Add New Study Room"
        description="List a new quiet study room or collaboration space for students and researchers."
        badge="Host a Space"
      />
    </div>
  );
}
