"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DashboardFacilityCard from "./DashboardFacilityCard";
import FacilityFormModal from "./FacilityFormModal";

export default function ManageFacilitiesClient({
  facilities,
  onAdd,
  onEdit,
  onDelete,
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [isPending, startTransition] = useTransition(); // 👈 ট্রানজিশন স্টেট নিন

  const openAdd = () => {
    setEditTarget(null);
    setModalOpen(true);
  };
  const openEdit = (f) => {
    setEditTarget(f);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditTarget(null);
  };

  const handleSave = async (formData) => {
    // startTransition-এর ভেতরে রাখলে অ্যাকশন শেষ হওয়া মাত্র UI রিফ্রেশ হবে
    startTransition(async () => {
      try {
        if (editTarget) {
          await onEdit(editTarget._id, formData);
        } else {
          await onAdd(formData);
        }
        router.refresh(); // 👈 ডাটা রি-ফেচ করতে বাধ্য করবে
        closeModal();
      } catch (error) {
        console.error("Failed to save:", error);
      }
    });
  };

  return (
    <>
      {/* যদি ব্যাকএন্ডে কাজ চলতে থাকে তবে ইউজারকে একটি ওভারলে বা অপাসিটি দেখাতে পারেন */}
      <div className={isPending ? "opacity-60 pointer-events-none" : ""}>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-black text-gray-800">
              {facilities.length}
            </span>{" "}
            facilit{facilities.length === 1 ? "y" : "ies"} found
          </p>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <span className="text-base leading-none">+</span>
            Add Facility
          </button>
        </div>

        {/* Grid */}
        {facilities.length === 0 ? (
          <div className="py-24 flex flex-col items-center text-center">
            <span className="text-6xl mb-4">🏟️</span>
            <p className="font-black text-gray-300 text-lg">
              No facilities yet
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Click Add Facility to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f) => (
              <DashboardFacilityCard
                key={f._id}
                facility={f}
                onEdit={openEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <FacilityFormModal
          facility={editTarget}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </>
  );
}
