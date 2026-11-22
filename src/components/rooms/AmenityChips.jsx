import { AMENITY_MAP } from "@/data/amenities";
import { Chip } from "@heroui/react";

export default function AmenityChips({
  amenities = [],
  max,
  className = "",
}) {
  if (!amenities || amenities.length === 0) return null;

  const visibleAmenities = max ? amenities.slice(0, max) : amenities;
  const extraCount = max && amenities.length > max ? amenities.length - max : 0;

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {visibleAmenities.map((name) => {
        const item = AMENITY_MAP[name];
        const Icon = item?.icon;

        return (
          <Chip
            key={name}
            size="sm"
            variant="secondary"
            className="border border-border bg-surface text-foreground font-medium text-xs px-2 py-0.5"
          >
            <span className="inline-flex items-center gap-1.5">
              {Icon && <Icon className="h-3 w-3 text-primary shrink-0" />}
              <span>{name}</span>
            </span>
          </Chip>
        );
      })}

      {extraCount > 0 && (
        <Chip
          size="sm"
          variant="tertiary"
          className="border border-border/70 bg-muted/10 text-muted font-medium text-xs px-2 py-0.5"
        >
          +{extraCount} more
        </Chip>
      )}
    </div>
  );
}
