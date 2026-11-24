"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Button } from "@heroui/react";
import AmenityChips from "./AmenityChips";
import { HiOutlineUserGroup, HiOutlineMapPin } from "react-icons/hi2";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80";

export default function RoomCard({ room }) {
  const [imgSrc, setImgSrc] = useState(room.image || FALLBACK_IMAGE);

  const capacityText =
    room.capacity.min === room.capacity.max
      ? `${room.capacity.min} ${room.capacity.min === 1 ? "person" : "people"}`
      : `${room.capacity.min}–${room.capacity.max} people`;

  const truncatedDesc =
    room.description.length > 100
      ? `${room.description.slice(0, 97).trim()}…`
      : room.description;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full flex flex-col"
    >
      <Card className="h-full flex flex-col border border-border bg-surface rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
        {/* Uniform 4:3 Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/10">
          <Image
            src={imgSrc}
            alt={room.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* Rate overlay badge */}
          <div className="absolute top-3 right-3 rounded-xl bg-surface/90 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-primary shadow-xs border border-border/60">
            ${room.hourlyRate}
            <span className="text-[10px] font-normal text-muted">/hr</span>
          </div>
        </div>

        <Card.Content className="p-5 flex-1 flex flex-col">
          {/* Floor & Capacity metadata */}
          <div className="flex items-center gap-3 text-xs text-muted font-medium mb-2.5">
            <span className="inline-flex items-center gap-1">
              <HiOutlineMapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              {room.floor}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <HiOutlineUserGroup className="h-3.5 w-3.5 text-primary shrink-0" />
              {capacityText}
            </span>
          </div>

          {/* Room Name */}
          <h3 className="font-heading text-lg font-bold text-foreground line-clamp-1 mb-2">
            {room.name}
          </h3>

          {/* Description truncated to ~100 characters */}
          <p className="text-sm text-muted leading-relaxed mb-4">
            {truncatedDesc}
          </p>

          {/* Amenity Chips (max 3 then +X more) */}
          <div className="mb-5">
            <AmenityChips amenities={room.amenities} max={3} />
          </div>

          {/* Pinned to bottom action */}
          <div className="mt-auto pt-3 border-t border-border/60">
            <Link href={`/rooms/${room.id}`} className="block w-full">
              <Button
                variant="primary"
                fullWidth
                className="w-full rounded-xl py-2 text-sm font-semibold shadow-xs"
              >
                View Details
              </Button>
            </Link>
          </div>
        </Card.Content>
      </Card>
    </motion.div>
  );
}
