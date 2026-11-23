import PageHeader from "@/components/common/PageHeader";
import AddRoomContent from "@/components/rooms/AddRoomContent";

export const metadata = {
  title: "StudyNook – Add Room",
  description:
    "List a new quiet study room or collaboration sanctuary for students, tutors, and researchers.",
};

export default function AddRoomPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <PageHeader
        badge="Host a Space"
        title="Add New Study Room"
        description="Share your department room, lab pod, or quiet alcove with the campus community. Fill out room specifications and amenities below."
      />
      <AddRoomContent />
    </div>
  );
}
