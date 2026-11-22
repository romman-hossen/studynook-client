"use client";

import { Modal, Button } from "@heroui/react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "primary",
}) {
  const isDanger = variant === "danger";

  return (
    <Modal.Backdrop
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoading) {
          onClose?.();
        }
      }}
      variant="blur"
      isDismissable={!isLoading}
    >
      <Modal.Container size="sm">
        <Modal.Dialog className="rounded-2xl border border-border bg-surface p-6 shadow-2xl">
          <Modal.Header className="flex items-center gap-3 pb-3 border-b border-border/70">
            {isDanger && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-danger/10 text-danger">
                <HiOutlineExclamationTriangle className="h-5 w-5" />
              </div>
            )}
            <Modal.Heading className="text-lg font-bold text-foreground font-heading">
              {title}
            </Modal.Heading>
            {!isLoading && <Modal.CloseTrigger className="ml-auto" />}
          </Modal.Header>

          <Modal.Body className="py-4 text-sm text-muted leading-relaxed">
            {message}
          </Modal.Body>

          <Modal.Footer className="flex items-center justify-end gap-3 pt-3 border-t border-border/70">
            <Button
              variant="outline"
              isDisabled={isLoading}
              onPress={onClose}
              className="rounded-xl px-4 py-2 text-sm font-medium"
            >
              {cancelText}
            </Button>
            <Button
              variant={isDanger ? "danger" : "primary"}
              isDisabled={isLoading}
              onPress={onConfirm}
              className="rounded-xl px-4 py-2 text-sm font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Loading...</span>
                </div>
              ) : (
                confirmText
              )}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
