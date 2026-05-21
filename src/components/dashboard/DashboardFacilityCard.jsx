"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DashboardFacilityCard({ facility, onEdit, onDelete }) {
  const router = useRouter();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = () => {
    if (!confirm(`Delete "${facility.name}"? This cannot be undone.`)) return;
    setDeleteError(null);
    startDeleteTransition(async () => {
      try {
        await onDelete(facility._id);
        router.refresh();
      } catch (err) {
        setDeleteError(err.message);
      }
    });
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md ${isDeleting ? "opacity-50 pointer-events-none" : ""}`}
    >
      {/* Image */}
      <div className="relative h-44 w-full shrink-0">
        <Image
          src={facility.image}
          alt={facility.name}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-facility.png";
          }}
        />
        {/* Type badge */}
        <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider bg-white/90 backdrop-blur-sm text-blue-600 px-2.5 py-1 rounded-full shadow-sm">
          {facility.type}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-black text-gray-900 text-sm leading-tight line-clamp-1">
            {facility.name}
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
            <span>📍</span> {facility.location}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2">
          <Stat
            label="Price/Session"
            value={`৳${facility.price?.toLocaleString()}`}
          />
          <Stat label="Capacity" value={facility.capacity?.toLocaleString()} />
        </div>

        {/* Slots */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            Available Slots ({facility.availableSlots?.length || 0})
          </p>
          <div className="flex flex-wrap gap-1">
            {(facility.availableSlots || []).slice(0, 4).map((slot) => (
              <span
                key={slot}
                className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md"
              >
                {slot}
              </span>
            ))}
            {(facility.availableSlots?.length || 0) > 4 && (
              <span className="text-[10px] font-semibold bg-gray-100 text-gray-400 px-2 py-0.5 rounded-md">
                +{facility.availableSlots.length - 4} more
              </span>
            )}
          </div>
        </div>

        {deleteError && (
          <p className="text-[11px] text-red-500 bg-red-50 px-2 py-1 rounded-lg">
            ⚠️ {deleteError}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-2 border-t border-gray-50">
          <button
            onClick={() => onEdit(facility)}
            className="flex-1 text-xs font-bold py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 text-xs font-bold py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-40"
          >
            {isDeleting ? "Deleting..." : "🗑 Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

const Stat = ({ label, value }) => (
  <div className="bg-gray-50 rounded-xl px-3 py-2">
    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
      {label}
    </p>
    <p className="text-sm font-black text-gray-800 mt-0.5">{value}</p>
  </div>
);
