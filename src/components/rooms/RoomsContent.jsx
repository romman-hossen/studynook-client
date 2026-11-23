"use client";

import { useState, useMemo, useEffect } from "react";
import { rooms } from "@/data/rooms";
import RoomGrid from "@/components/rooms/RoomGrid";
import RoomFilters from "@/components/rooms/RoomFilters";
import EmptyState from "@/components/common/EmptyState";
import { Button } from "@heroui/react";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineXMark,
  HiOutlineSparkles,
  HiOutlineFaceFrown,
} from "react-icons/hi2";

const MIN_RATE = 4;
const MAX_RATE = 15;

export default function RoomsContent() {
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [maxRate, setMaxRate] = useState(MAX_RATE);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filter conditions active check
  const hasActiveFilters = Boolean(
    search.trim() !== "" ||
      selectedAmenities.length > 0 ||
      maxRate < MAX_RATE
  );

  const activeFilterCount =
    (search.trim() !== "" ? 1 : 0) +
    selectedAmenities.length +
    (maxRate < MAX_RATE ? 1 : 0);

  const handleClearFilters = () => {
    setSearch("");
    setSelectedAmenities([]);
    setMaxRate(MAX_RATE);
  };

  // Filtered rooms logic
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // 1. Search by name (case-insensitive)
      if (
        search.trim() &&
        !room.name.toLowerCase().includes(search.toLowerCase().trim())
      ) {
        return false;
      }

      // 2. Room must include ALL selected amenities
      if (
        selectedAmenities.length > 0 &&
        !selectedAmenities.every((amenity) =>
          room.amenities.includes(amenity)
        )
      ) {
        return false;
      }

      // 3. Hourly rate within range
      if (room.hourlyRate > maxRate) {
        return false;
      }

      return true;
    });
  }, [search, selectedAmenities, maxRate]);

  // Simulate short loading state (~500ms) on initial load and when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [search, selectedAmenities, maxRate]);

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
      {/* Mobile Filters Toggle Button & Active Badges */}
      <div className="lg:hidden mb-6 flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          onPress={() => setIsMobileFiltersOpen((prev) => !prev)}
          className="flex items-center gap-2 border-border bg-surface text-foreground font-medium text-sm rounded-xl px-4 py-2 shadow-2xs"
        >
          <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-primary" />
          <span>{isMobileFiltersOpen ? "Hide Filters" : "Filter Rooms"}</span>
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white ml-1">
              {activeFilterCount}
            </span>
          )}
        </Button>

        <span className="text-xs sm:text-sm text-muted font-medium">
          Showing <span className="text-foreground font-semibold">{filteredRooms.length}</span>{" "}
          {filteredRooms.length === 1 ? "room" : "rooms"}
        </span>
      </div>

      {/* Mobile Collapsible Filter Drawer/Panel */}
      {isMobileFiltersOpen && (
        <div className="lg:hidden mb-8 animate-in fade-in slide-in-from-top-3 duration-200">
          <RoomFilters
            search={search}
            setSearch={setSearch}
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
            maxRate={maxRate}
            setMaxRate={setMaxRate}
            minRatePossible={MIN_RATE}
            maxRatePossible={MAX_RATE}
            onClear={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      )}

      {/* Main Grid: Sticky Sidebar + Room Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sticky Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-24">
          <RoomFilters
            search={search}
            setSearch={setSearch}
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
            maxRate={maxRate}
            setMaxRate={setMaxRate}
            minRatePossible={MIN_RATE}
            maxRatePossible={MAX_RATE}
            onClear={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Bar on Desktop: Result Counter & Active Filter Pills */}
          <div className="hidden lg:flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted">
                Showing{" "}
                <span className="text-foreground font-semibold">
                  {filteredRooms.length}
                </span>{" "}
                {filteredRooms.length === 1 ? "study room" : "study rooms"}
              </span>
              {hasActiveFilters && (
                <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Filtered
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-medium text-muted hover:text-danger transition-colors flex items-center gap-1 cursor-pointer"
              >
                <HiOutlineXMark className="w-3.5 h-3.5" />
                Reset filters
              </button>
            )}
          </div>

          {/* Room Display with Loading or Empty State */}
          {isLoading ? (
            <RoomGrid isLoading={true} skeletonCount={6} />
          ) : filteredRooms.length === 0 ? (
            <EmptyState
              icon={<HiOutlineFaceFrown className="h-7 w-7" />}
              title="No rooms found"
              message="No study rooms match your current filters. Try relaxing your search criteria or resetting filters to view all available spaces."
              action={{
                label: "Clear filters",
                onClick: handleClearFilters,
              }}
              className="py-16 sm:py-20"
            />
          ) : (
            <RoomGrid rooms={filteredRooms} />
          )}
        </div>
      </div>
    </div>
  );
}
