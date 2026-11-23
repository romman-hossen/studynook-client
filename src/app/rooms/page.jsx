import PageHeader from "@/components/common/PageHeader";
import RoomsContent from "@/components/rooms/RoomsContent";

export const metadata = {
  title: "StudyNook – Available Rooms",
  description:
    "Explore and reserve verified quiet study sanctuaries, collaboration suites, and multimedia labs across our library campus.",
};

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto flex justify-center text-center max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <PageHeader
          badge="Catalog"
          title="Available Study Rooms"
          description="Browse quiet sanctuaries, private collaboration pods, and tech-equipped labs. Filter by amenities, capacity, and hourly rate to find your ideal focus space."
        />
      </div>
      <RoomsContent />
    </div>
  );
}
