"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionHeading from "@/components/common/SectionHeading";
import RoomGrid from "@/components/rooms/RoomGrid";
import rooms from "@/data/rooms";
import { HiOutlineArrowRight } from "react-icons/hi2";

export default function LatestRooms() {
  const [loading, setLoading] = useState(true);
  const [latestRooms, setLatestRooms] = useState([]);

  useEffect(() => {
    // Simulate brief ~600ms loading state for skeleton demonstration
    const timer = setTimeout(() => {
      const sorted = [...rooms]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
      setLatestRooms(sorted);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Curated Spaces"
          title="Available Study Rooms"
          subtitle="Explore our top-rated quiet desks, collaborative team suites, and modern media hubs."
        />

        <RoomGrid rooms={latestRooms} isLoading={loading} skeletonCount={6} />

        <div className="mt-12 text-center">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground shadow-xs transition-colors hover:border-primary/40 hover:bg-muted/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
          >
            <span>View All Rooms</span>
            <HiOutlineArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
