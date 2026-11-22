import RoomCard from "./RoomCard";
import RoomCardSkeleton from "@/components/common/RoomCardSkeleton";
import EmptyState from "@/components/common/EmptyState";

export default function RoomGrid({
  rooms = [],
  isLoading = false,
  skeletonCount = 6,
  className = "",
}) {
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${className}`}
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <RoomCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!rooms || rooms.length === 0) {
    return (
      <EmptyState
        title="No study rooms found"
        message="We could not find any rooms matching your criteria. Try adjusting your search or filters."
      />
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${className}`}
    >
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}
