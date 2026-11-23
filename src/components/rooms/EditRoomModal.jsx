"use client";

import { Modal } from "@heroui/react";
import RoomForm from "@/components/rooms/RoomForm";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function EditRoomModal({
  isOpen,
  onClose,
  room,
  onSaveSuccess,
}) {
  if (!room) return null;

  const handleSubmit = (updatedValues) => {
    // MOCK: replace with API call
    toast.success("Room updated successfully");
    onSaveSuccess?.({ ...room, ...updatedValues });
    onClose?.();
  };

  return (
    <Modal.Backdrop
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose?.();
      }}
      variant="blur"
    >
      <Modal.Container size="lg">
        <Modal.Dialog className="rounded-2xl border border-border bg-surface p-6 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <Modal.Header className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <HiOutlinePencilSquare className="h-5 w-5" />
              </div>
              <div>
                <Modal.Heading className="text-lg font-bold text-foreground font-heading">
                  Edit Room
                </Modal.Heading>
                <p className="text-xs text-muted font-medium">{room.name}</p>
              </div>
            </div>
            <Modal.CloseTrigger />
          </Modal.Header>

          <Modal.Body className="py-4">
            <RoomForm
              initialValues={room}
              submitLabel="Save Changes"
              onCancel={onClose}
              onSubmit={handleSubmit}
            />
          </Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
