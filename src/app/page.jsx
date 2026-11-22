import Hero from "@/components/home/Hero";
import LatestRooms from "@/components/home/LatestRooms";
import HowItWorks from "@/components/home/HowItWorks";
import WhyStudyNook from "@/components/home/WhyStudyNook";

export const metadata = {
  title: "StudyNook – Home",
  description:
    "Library Study Room Booking Platform. Find and reserve quiet study rooms, private research pods, and collaborative team suites.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <LatestRooms />
      <HowItWorks />
      <WhyStudyNook />
    </div>
  );
}
