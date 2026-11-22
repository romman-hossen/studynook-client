export default function RoomCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xs animate-pulse">
      {/* 4:3 Image Skeleton */}
      <div className="aspect-[4/3] w-full bg-muted/20" />

      <div className="flex flex-1 flex-col p-5">
        {/* Floor and Capacity Skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-3.5 w-16 rounded bg-muted/20" />
          <div className="h-3.5 w-2 rounded-full bg-muted/20" />
          <div className="h-3.5 w-20 rounded bg-muted/20" />
        </div>

        {/* Title Skeleton */}
        <div className="h-5 w-3/4 rounded-md bg-muted/20 mb-2.5" />

        {/* Description Skeleton */}
        <div className="space-y-1.5 mb-5">
          <div className="h-3.5 w-full rounded bg-muted/15" />
          <div className="h-3.5 w-5/6 rounded bg-muted/15" />
        </div>

        {/* Amenity Chips Skeleton */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          <div className="h-6 w-16 rounded-md bg-muted/20" />
          <div className="h-6 w-20 rounded-md bg-muted/20" />
          <div className="h-6 w-14 rounded-md bg-muted/20" />
        </div>

        {/* Button Skeleton pinned to bottom */}
        <div className="mt-auto pt-3 border-t border-border/60">
          <div className="h-9 w-full rounded-xl bg-muted/20" />
        </div>
      </div>
    </div>
  );
}
