"use client";

import Image from "next/image";
import { useState, useEffect, useTransition } from "react";

const SPORT_TYPES = [
  "Cricket",
  "Football",
  "Basketball",
  "Swimming",
  "Tennis",
  "Badminton",
  "Volleyball",
  "Athletics",
  "Other",
];

const ALL_SLOTS = [
  "6AM-8AM",
  "8AM-10AM",
  "10AM-12PM",
  "12PM-2PM",
  "2PM-4PM",
  "4PM-6PM",
  "6PM-8PM",
  "8PM-10PM",
];

const EMPTY_FORM = {
  name: "",
  type: "Cricket",
  location: "",
  price: "",
  capacity: "",
  image: "",
  description: "",
  availableSlots: [],
};

export default function FacilityFormModal({ facility, onSave, onClose }) {
  const isEdit = !!facility;
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isPending, startTransition] = useTransition();

  // Edit mode-এ form pre-fill করা
  useEffect(() => {
    if (facility) {
      setForm({
        name: facility.name || "",
        type: facility.type || "Cricket",
        location: facility.location || "",
        price: facility.price || "",
        capacity: facility.capacity || "",
        image: facility.image || "",
        description: facility.description || "",
        availableSlots: facility.availableSlots || [],
      });
    }
  }, [facility]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.price || form.price <= 0) e.price = "Valid price required";
    if (!form.capacity || form.capacity <= 0)
      e.capacity = "Valid capacity required";
    if (!form.image.trim()) e.image = "Image URL is required";
    if (form.availableSlots.length === 0)
      e.availableSlots = "Select at least one slot";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const toggleSlot = (slot) => {
    setForm((prev) => ({
      ...prev,
      availableSlots: prev.availableSlots.includes(slot)
        ? prev.availableSlots.filter((s) => s !== slot)
        : [...prev.availableSlots, slot],
    }));
    if (errors.availableSlots)
      setErrors((prev) => ({ ...prev, availableSlots: null }));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    startTransition(async () => {
      try {
        await onSave({
          ...form,
          price: Number(form.price),
          capacity: Number(form.capacity),
        });
        onClose();
      } catch (err) {
        setErrors({ submit: err.message });
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 className="text-lg font-black text-gray-900">
              {isEdit ? "Edit Facility" : "Add New Facility"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {isEdit
                ? `Editing: ${facility.name}`
                : "Fill in the details below"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Submit error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              ⚠️ {errors.submit}
            </div>
          )}

          {/* Row: Name + Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Facility Name" error={errors.name}>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. National Cricket Stadium"
                className={inputCls(errors.name)}
              />
            </Field>
            <Field label="Sport Type" error={errors.type}>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={inputCls()}
              >
                {SPORT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Location */}
          <Field label="Location" error={errors.location}>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Mirpur, Dhaka"
              className={inputCls(errors.location)}
            />
          </Field>

          {/* Row: Price + Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Price per Session (৳)" error={errors.price}>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 12000"
                className={inputCls(errors.price)}
              />
            </Field>
            <Field label="Capacity (persons)" error={errors.capacity}>
              <input
                name="capacity"
                type="number"
                value={form.capacity}
                onChange={handleChange}
                placeholder="e.g. 25000"
                className={inputCls(errors.capacity)}
              />
            </Field>
          </div>

          {/* Image URL */}
          <Field label="Image URL" error={errors.image}>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className={inputCls(errors.image)}
            />
            {form.image && (
              <Image
                src={form.image}
                alt="preview"
                width={300}
                height={500}
                className="mt-2 h-50 w-full object-cover rounded-xl border border-gray-100"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </Field>

          {/* Description */}
          <Field label="Description">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe the facility..."
              className={inputCls() + " resize-none"}
            />
          </Field>

          {/* Available Slots */}
          <Field label="Available Slots" error={errors.availableSlots}>
            <div className="flex flex-wrap gap-2 mt-1">
              {ALL_SLOTS.map((slot) => {
                const active = form.availableSlots.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => toggleSlot(slot)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                      active
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3 justify-end rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-6 py-2 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPending && (
              <svg
                className="animate-spin h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            )}
            {isPending ? "Saving..." : isEdit ? "Save Changes" : "Add Facility"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────
const inputCls = (error) =>
  `w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 ${
    error
      ? "border-red-300 bg-red-50"
      : "border-gray-200 bg-gray-50 focus:bg-white"
  }`;

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-bold text-gray-600 mb-1.5">
      {label}
    </label>
    {children}
    {error && <p className="text-[11px] text-red-500 mt-1">⚠ {error}</p>}
  </div>
);
