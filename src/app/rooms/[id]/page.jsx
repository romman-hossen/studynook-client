import { Suspense } from "react";
import { notFound } from "next/navigation";
import { rooms } from "@/data/rooms";
import RoomDetailsContent from "@/components/rooms/RoomDetailsContent";
import Spinner from "@/components/common/Spinner";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return {
      title: "StudyNook – Room Not Found",
    };
  }

  return {
    title: `StudyNook – ${room.name}`,
    description: room.description.slice(0, 160),
  };
}

async function RoomDetailsAsync({ params }) {
  const { id } = await params;
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    notFound();
  }

  return <RoomDetailsContent initialRoom={room} />;
}

export default function RoomDetailPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="py-24">
          <Spinner fullPage={false} label="Loading room details..." />
        </div>
      }
    >
      <RoomDetailsAsync params={params} />
    </Suspense>
  );
}
