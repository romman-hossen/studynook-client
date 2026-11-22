import { Suspense } from "react";
import rooms from "@/data/rooms";
import Spinner from "@/components/common/Spinner";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const room = rooms.find((r) => r.id === id);
  return {
    title: room ? `StudyNook – ${room.name}` : `StudyNook – Room Details #${id}`,
  };
}

async function Details({ params }) {
  const { id } = await params;
  const room = rooms.find((r) => r.id === id);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-2xl font-bold font-heading">
        Room Details: {room ? room.name : id}
      </h1>
    </div>
  );
}

export default function RoomDetailPage({ params }) {
  return (
    <Suspense fallback={<Spinner fullPage label="Loading room details..." />}>
      <Details params={params} />
    </Suspense>
  );
}
