export const metadata = {
  title: "StudyNook – Home",
  description: "StudyNook – Library Study Room Booking Platform",
};

export default function HomePage() {
  return (
    <div className="container mx-auto flex flex-1 flex-col items-center justify-center max-w-7xl px-4 py-20 text-center">
      <div className="max-w-2xl space-y-4">
        <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          Library Study Room Booking Platform
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-heading">
          Find your perfect study sanctuary
        </h1>
        <p className="text-base md:text-lg text-muted leading-relaxed">
          Quiet reading desks, collaborative group rooms, and multimedia spaces. Book the room you need to succeed.
        </p>
      </div>
    </div>
  );
}
