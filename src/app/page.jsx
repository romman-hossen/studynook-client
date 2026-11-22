import SectionHeading from "@/components/common/SectionHeading";
import RoomGrid from "@/components/rooms/RoomGrid";
import rooms from "@/data/rooms";

export const metadata = {
  title: "StudyNook – Home",
  description: "StudyNook – Library Study Room Booking Platform",
};

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <SectionHeading
        badge="Available Spaces"
        title="Featured Study Rooms"
        subtitle="Explore our quiet reading sanctuaries, group collaboration spaces, and presentation hubs."
      />
      <RoomGrid rooms={rooms} />
    </div>
  );
}
