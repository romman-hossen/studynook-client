"use client";

import { useState } from "react";
import { AMENITIES } from "@/data/amenities";
import {
  Form,
  TextField,
  Label,
  Input,
  TextArea,
  Checkbox,
  Button,
} from "@heroui/react";

export default function RoomForm({
  initialValues = {},
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save Room",
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    description: initialValues.description || "",
    image: initialValues.image || "",
    floor: initialValues.floor || "Floor 1",
    capacityMin: initialValues.capacity?.min || 1,
    capacityMax: initialValues.capacity?.max || 4,
    hourlyRate: initialValues.hourlyRate || 5,
    amenities: initialValues.amenities || [],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Room name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description should be at least 20 characters";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (
      !formData.image.startsWith("http://") &&
      !formData.image.startsWith("https://")
    ) {
      newErrors.image = "Image URL must start with http:// or https://";
    }

    if (!formData.floor.trim()) {
      newErrors.floor = "Floor is required";
    }

    if (!formData.capacityMin || Number(formData.capacityMin) < 1) {
      newErrors.capacityMin = "Min capacity must be at least 1";
    }

    if (
      !formData.capacityMax ||
      Number(formData.capacityMax) < Number(formData.capacityMin)
    ) {
      newErrors.capacityMax = "Max capacity must be greater than or equal to min capacity";
    }

    if (!formData.hourlyRate || Number(formData.hourlyRate) < 1) {
      newErrors.hourlyRate = "Hourly rate must be at least $1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleAmenity = (name) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(name);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((item) => item !== name)
          : [...prev.amenities, name],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      capacity: {
        min: Number(formData.capacityMin),
        max: Number(formData.capacityMax),
      },
      hourlyRate: Number(formData.hourlyRate),
    };

    delete payload.capacityMin;
    delete payload.capacityMax;

    onSubmit?.(payload);
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-6">
      {/* Room Name */}
      <TextField
        name="name"
        value={formData.name}
        onChange={(val) => handleChange("name", val)}
        isInvalid={Boolean(errors.name)}
        className="w-full"
      >
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted">
          Room Name <span className="text-danger">*</span>
        </Label>
        <Input
          placeholder="e.g. Turing Collaboration Suite"
          className="mt-1"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-danger">{errors.name}</p>
        )}
      </TextField>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
          Description <span className="text-danger">*</span>
        </label>
        <TextArea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe the room ambiance, furniture, acoustics, and best use cases..."
          rows={4}
          className={`w-full rounded-xl border bg-surface p-3 text-sm text-foreground transition-colors placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
            errors.description ? "border-danger" : "border-border"
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-danger">{errors.description}</p>
        )}
      </div>

      {/* Image URL */}
      <TextField
        name="image"
        value={formData.image}
        onChange={(val) => handleChange("image", val)}
        isInvalid={Boolean(errors.image)}
        className="w-full"
      >
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted">
          Image URL <span className="text-danger">*</span>
        </Label>
        <Input
          placeholder="https://images.unsplash.com/..."
          className="mt-1"
        />
        {errors.image && (
          <p className="mt-1 text-xs text-danger">{errors.image}</p>
        )}
      </TextField>

      {/* Floor & Capacity */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Floor */}
        <TextField
          name="floor"
          value={formData.floor}
          onChange={(val) => handleChange("floor", val)}
          isInvalid={Boolean(errors.floor)}
          className="w-full"
        >
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted">
            Floor <span className="text-danger">*</span>
          </Label>
          <Input placeholder="e.g. Floor 2" className="mt-1" />
          {errors.floor && (
            <p className="mt-1 text-xs text-danger">{errors.floor}</p>
          )}
        </TextField>

        {/* Min Capacity */}
        <TextField
          name="capacityMin"
          type="number"
          value={String(formData.capacityMin)}
          onChange={(val) => handleChange("capacityMin", val)}
          isInvalid={Boolean(errors.capacityMin)}
          className="w-full"
        >
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted">
            Min People <span className="text-danger">*</span>
          </Label>
          <Input min={1} max={50} className="mt-1" />
          {errors.capacityMin && (
            <p className="mt-1 text-xs text-danger">{errors.capacityMin}</p>
          )}
        </TextField>

        {/* Max Capacity */}
        <TextField
          name="capacityMax"
          type="number"
          value={String(formData.capacityMax)}
          onChange={(val) => handleChange("capacityMax", val)}
          isInvalid={Boolean(errors.capacityMax)}
          className="w-full"
        >
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted">
            Max People <span className="text-danger">*</span>
          </Label>
          <Input min={1} max={50} className="mt-1" />
          {errors.capacityMax && (
            <p className="mt-1 text-xs text-danger">{errors.capacityMax}</p>
          )}
        </TextField>
      </div>

      {/* Hourly Rate */}
      <TextField
        name="hourlyRate"
        type="number"
        value={String(formData.hourlyRate)}
        onChange={(val) => handleChange("hourlyRate", val)}
        isInvalid={Boolean(errors.hourlyRate)}
        className="w-full"
      >
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted">
          Hourly Rate ($/hr) <span className="text-danger">*</span>
        </Label>
        <Input min={1} max={100} className="mt-1" />
        {errors.hourlyRate && (
          <p className="mt-1 text-xs text-danger">{errors.hourlyRate}</p>
        )}
      </TextField>

      {/* Amenities Selection */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
          Available Amenities
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {AMENITIES.map((amenity) => {
            const Icon = amenity.icon;
            const isChecked = formData.amenities.includes(amenity.name);

            return (
              <div
                key={amenity.id}
                onClick={() => toggleAmenity(amenity.name)}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isChecked
                    ? "border-primary/40 bg-primary/5 text-foreground"
                    : "border-border bg-surface text-muted hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isChecked
                        ? "bg-primary text-white"
                        : "bg-muted/10 text-muted"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {amenity.name}
                  </span>
                </div>

                <Checkbox.Root
                  isSelected={isChecked}
                  onChange={() => toggleAmenity(amenity.name)}
                  aria-label={amenity.name}
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

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            isDisabled={isSubmitting}
            onPress={onCancel}
            className="rounded-xl px-4 py-2 text-sm font-medium"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          isDisabled={isSubmitting}
          className="rounded-xl px-6 py-2 text-sm font-semibold shadow-sm"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </Form>
  );
}
