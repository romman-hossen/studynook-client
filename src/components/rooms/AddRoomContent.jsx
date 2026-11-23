"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import RoomForm from "@/components/rooms/RoomForm";
import toast from "react-hot-toast";

export default function AddRoomContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (newRoomData) => {
    setIsSubmitting(true);
    // MOCK: replace with API call
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Prepare room object with author info
    const fullRoom = {
      id: `room-${Date.now()}`,
      ...newRoomData,
      bookingCount: 0,
      ownerName: user?.name || "Anonymous Host",
      ownerEmail: user?.email || "demo@studynook.com",
      createdAt: new Date().toISOString(),
    };

    setIsSubmitting(false);
    toast.success("Room added successfully");
    router.push("/my-listings");
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm max-w-3xl mx-auto">
      <RoomForm
        initialValues={{
          name: "",
          description: "",
          image: "",
          floor: "Floor 1",
          capacity: { min: 2, max: 6 },
          hourlyRate: 8,
          amenities: ["Wi-Fi", "Quiet Zone"],
        }}
        submitLabel="Publish Room"
        isSubmitting={isSubmitting}
        onCancel={() => router.back()}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
