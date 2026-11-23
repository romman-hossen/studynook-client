"use client";

import { useState, useMemo } from "react";
import { Modal, Button, TextField, Label, Input, TextArea } from "@heroui/react";
import { timeSlots } from "@/data/timeSlots";
import { HiOutlineCalendarDays, HiOutlineClock, HiOutlineCurrencyDollar } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function BookingModal({
  isOpen,
  onClose,
  room,
}) {
  const todayStr = useMemo(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes
  const handleClose = () => {
    if (isSubmitting) return;
    setDate("");
    setStartTime("");
    setEndTime("");
    setNote("");
    setErrors({});
    onClose?.();
  };

  // Valid end times must be strictly after startTime (at least 1 hour)
  const availableEndTimes = useMemo(() => {
    if (!startTime) return [];
    const startIndex = timeSlots.indexOf(startTime);
    if (startIndex === -1) return [];
    return timeSlots.slice(startIndex + 1);
  }, [startTime]);

  // Handle start time change and reset endTime if invalid
  const handleStartTimeChange = (newStart) => {
    setStartTime(newStart);
    if (endTime) {
      const startIdx = timeSlots.indexOf(newStart);
      const endIdx = timeSlots.indexOf(endTime);
      if (endIdx <= startIdx) {
        setEndTime("");
      }
    }
    if (errors.startTime) {
      setErrors((prev) => ({ ...prev, startTime: undefined }));
    }
  };

  // Calculate live total cost
  const durationHours = useMemo(() => {
    if (!startTime || !endTime) return 0;
    const startHour = parseInt(startTime.split(":")[0], 10);
    const endHour = parseInt(endTime.split(":")[0], 10);
    return Math.max(0, endHour - startHour);
  }, [startTime, endTime]);

  const totalCost = durationHours * (room?.hourlyRate || 0);

  const validate = () => {
    const newErrors = {};

    if (!date) {
      newErrors.date = "Please select a booking date";
    } else if (date < todayStr) {
      newErrors.date = "Booking date cannot be in the past";
    }

    if (!startTime) {
      newErrors.startTime = "Please select a start time";
    }

    if (!endTime) {
      newErrors.endTime = "Please select an end time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief booking confirmation
    await new Promise((resolve) => setTimeout(resolve, 350));
    setIsSubmitting(false);

    toast.success("Room booked successfully!");
    handleClose();
  };

  if (!room) return null;

  return (
    <Modal.Backdrop
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
      variant="blur"
      isDismissable={!isSubmitting}
    >
      <Modal.Container size="md">
        <Modal.Dialog className="rounded-2xl border border-border bg-surface p-6 shadow-2xl max-w-lg w-full">
          <Modal.Header className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <HiOutlineCalendarDays className="h-5 w-5" />
              </div>
              <div>
                <Modal.Heading className="text-lg font-bold text-foreground font-heading">
                  Book Study Room
                </Modal.Heading>
                <p className="text-xs text-muted font-medium">{room.name}</p>
              </div>
            </div>
            {!isSubmitting && <Modal.CloseTrigger />}
          </Modal.Header>

          <Modal.Body className="py-4 space-y-4">
            {/* Date Input */}
            <div>
              <label
                htmlFor="booking-date"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1"
              >
                Booking Date <span className="text-danger">*</span>
              </label>
              <input
                id="booking-date"
                type="date"
                min={todayStr}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (errors.date) {
                    setErrors((prev) => ({ ...prev, date: undefined }));
                  }
                }}
                className={`w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  errors.date ? "border-danger" : "border-border"
                }`}
              />
              {errors.date && (
                <p className="mt-1 text-xs text-danger">{errors.date}</p>
              )}
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Time Select */}
              <div>
                <label
                  htmlFor="booking-start-time"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1"
                >
                  Start Time <span className="text-danger">*</span>
                </label>
                <select
                  id="booking-start-time"
                  value={startTime}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                  className={`w-full rounded-xl border bg-surface px-3 py-2.5 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                    errors.startTime ? "border-danger" : "border-border"
                  }`}
                >
                  <option value="">Select start time</option>
                  {timeSlots.slice(0, -1).map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.startTime && (
                  <p className="mt-1 text-xs text-danger">{errors.startTime}</p>
                )}
              </div>

              {/* End Time Select */}
              <div>
                <label
                  htmlFor="booking-end-time"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1"
                >
                  End Time <span className="text-danger">*</span>
                </label>
                <select
                  id="booking-end-time"
                  value={endTime}
                  disabled={!startTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                    if (errors.endTime) {
                      setErrors((prev) => ({ ...prev, endTime: undefined }));
                    }
                  }}
                  className={`w-full rounded-xl border bg-surface px-3 py-2.5 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.endTime ? "border-danger" : "border-border"
                  }`}
                >
                  <option value="">
                    {!startTime ? "Pick start time first" : "Select end time"}
                  </option>
                  {availableEndTimes.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.endTime && (
                  <p className="mt-1 text-xs text-danger">{errors.endTime}</p>
                )}
              </div>
            </div>

            {/* Live Total Cost Breakdown */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <HiOutlineClock className="w-4 h-4 text-primary" />
                  <span>
                    Duration:{" "}
                    <strong className="text-foreground">
                      {durationHours > 0 ? `${durationHours} hour${durationHours > 1 ? "s" : ""}` : "—"}
                    </strong>
                  </span>
                </div>
                <div className="text-xs text-muted">
                  Rate: ${room.hourlyRate}/hr
                </div>
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-primary/10 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Estimated Total:
                </span>
                <span className="text-lg font-bold font-mono text-primary">
                  ${totalCost}
                </span>
              </div>
            </div>

            {/* Optional Special Note */}
            <div>
              <label
                htmlFor="booking-note"
                className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1"
              >
                Special Note <span className="text-muted/60">(Optional)</span>
              </label>
              <TextArea
                id="booking-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Need whiteboard markers, thesis prep, group project presentation..."
                rows={3}
                className="w-full rounded-xl border border-border bg-surface p-3 text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </Modal.Body>

          <Modal.Footer className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <Button
              variant="outline"
              isDisabled={isSubmitting}
              onPress={handleClose}
              className="rounded-xl px-4 py-2 text-sm font-medium"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              isDisabled={isSubmitting}
              onPress={handleConfirm}
              className="rounded-xl px-6 py-2 text-sm font-semibold shadow-sm"
            >
              {isSubmitting ? "Confirming..." : "Confirm Booking"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
