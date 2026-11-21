export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `StudyNook – Room Details #${id}`,
  };
}

export default async function RoomDetailPage({ params }) {
  const { id } = await params;
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-2xl font-bold">Room Details: {id}</h1>
    </div>
  );
}
