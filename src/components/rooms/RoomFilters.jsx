"use client";

import { AMENITIES } from "@/data/amenities";
import { TextField, Input, Checkbox, Slider, Button } from "@heroui/react";
import { HiOutlineMagnifyingGlass, HiOutlineXMark, HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

export default function RoomFilters({
  search,
  setSearch,
  selectedAmenities,
  setSelectedAmenities,
  maxRate,
  setMaxRate,
  minRatePossible = 4,
  maxRatePossible = 15,
  onClear,
  hasActiveFilters,
  className = "",
}) {
  const toggleAmenity = (name) => {
    setSelectedAmenities((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm ${className}`}
    >
      {/* Header with Title and Clear Action */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2 text-foreground font-heading font-semibold text-base sm:text-lg">
          <HiOutlineAdjustmentsHorizontal className="w-5 h-5 text-primary" />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <Button
            size="sm"
            variant="ghost"
            onPress={onClear}
            className="text-xs font-medium text-muted hover:text-danger hover:bg-danger/10 transition-colors h-8 px-2.5 rounded-lg"
          >
            <HiOutlineXMark className="w-3.5 h-3.5 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-6 pt-5">
        {/* Search by Room Name */}
        <div>
          <label
            htmlFor="room-search-input"
            className="block text-xs font-semibold uppercase tracking-wider text-muted mb-2"
          >
            Search Room
          </label>
          <TextField
            name="search"
            value={search}
            onChange={(val) => setSearch(val)}
            className="w-full"
          >
            <div className="relative">
              <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
              <Input
                id="room-search-input"
                placeholder="Search by room name..."
                className="pl-9 pr-8 text-sm"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground p-1"
                  aria-label="Clear search"
                >
                  <HiOutlineXMark className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </TextField>
        </div>

        {/* Hourly Rate Range Slider */}
        <div className="pt-2 border-t border-border/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Max Hourly Rate
            </span>
            <span className="text-sm font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full font-mono">
              ${maxRate}/hr
            </span>
          </div>
          <div className="text-xs text-muted mb-3">
            Budget range: ${minRatePossible}/hr – ${maxRate}/hr
          </div>

          <Slider.Root
            value={maxRate}
            minValue={minRatePossible}
            maxValue={maxRatePossible}
            step={1}
            onChange={(val) => setMaxRate(val)}
            className="w-full"
            aria-label="Maximum hourly rate"
          >
            <Slider.Track className="h-2 bg-muted/20 rounded-full relative">
              <Slider.Fill className="bg-primary rounded-full" />
              <Slider.Thumb className="h-5 w-5 rounded-full bg-surface border-2 border-primary shadow-md hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-grab active:cursor-grabbing" />
            </Slider.Track>
          </Slider.Root>

          <div className="flex justify-between text-[11px] text-muted font-medium mt-2">
            <span>${minRatePossible}</span>
            <span>${Math.round((minRatePossible + maxRatePossible) / 2)}</span>
            <span>${maxRatePossible}</span>
          </div>
        </div>

        {/* Amenities Checkboxes */}
        <div className="pt-2 border-t border-border/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Required Amenities
            </span>
            {selectedAmenities.length > 0 && (
              <span className="text-xs font-medium text-primary">
                {selectedAmenities.length} selected
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            {AMENITIES.map((amenity) => {
              const Icon = amenity.icon;
              const isChecked = selectedAmenities.includes(amenity.name);

              return (
                <div
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.name)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                    isChecked
                      ? "border-primary/40 bg-primary/5 text-foreground shadow-2xs"
                      : "border-transparent bg-muted/5 text-foreground hover:bg-muted/10 hover:border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isChecked
                          ? "bg-primary text-white"
                          : "bg-surface border border-border text-muted"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium">{amenity.name}</span>
                  </div>

                  <Checkbox.Root
                    isSelected={isChecked}
                    onChange={() => toggleAmenity(amenity.name)}
                    aria-label={`Filter by ${amenity.name}`}
                  >
                    <Checkbox.Control className="w-4 h-4 rounded border border-border flex items-center justify-center data-[selected=true]:bg-primary data-[selected=true]:border-primary transition-colors">
                      <Checkbox.Indicator className="text-white text-[10px]" />
                    </Checkbox.Control>
                  </Checkbox.Root>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clear filters footer button */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-border/60">
            <Button
              variant="outline"
              fullWidth
              onPress={onClear}
              className="text-xs font-semibold text-muted hover:text-foreground border-border hover:bg-surface-raised transition-colors"
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
