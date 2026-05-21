"use client";
import FormSection from "@/components/AddFacilitie/FormSection";
import TimeSlot from "@/components/AddFacilitie/TimeSlot";
import CustomInput from "@/components/SearchBar/CustomInput";
import CustomSelect from "@/components/SearchBar/CustomSelect";
import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { createFacilities } from "@/app/lib/action";

const timeSlotsArray = [
  "6AM-8AM",
  "8AM-10AM",
  "10AM-12PM",
  "12PM-2PM",
  "2PM-4PM",
  "4PM-6PM",
  "6PM-8PM",
  "8PM-10PM",
];

const AddNewFacilitiePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

  // ফর্ম ডাটা স্টেট
  const [formData, setFormData] = useState({
    name: "",
    type: "Football",
    location: "",
    price: "",
    capacity: "",
    image: "",
    description: "",
  });

  // ইনপুট হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // টাইম স্লট টগল লজিক
  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );
  };

  // Select All & Clear All লজিক
  const handleSelectAll = () => setSelectedSlots(timeSlotsArray);
  const handleClearAll = () => setSelectedSlots([]);

  // ফর্ম সাবমিট হ্যান্ডলার (MongoDB তে ডাটা যাবে)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSlots.length === 0) {
      alert("Please select at least one time slot.");
      return;
    }
    setLoading(true);

    const finalData = {
      ...formData,
      price: Number(formData.price),
      capacity: Number(formData.capacity),
      availableSlots: selectedSlots,
      ownerEmail: user?.email,
    };

    // console.log(finalData)
    try {
      const result = await createFacilities(finalData);

      if (result?.error) {
        alert(result.error);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }

    
  };

  return (
    <div className="min-h-screen bg-surface p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8 flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-xl text-primary-container">
            <FiPlusCircle size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Dashboard &gt; Add Facility
            </p>
            <h1 className="text-2xl font-black text-gray-800">
              Add New Facility
            </h1>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-50"
        >
          {/* Section 1: Basic Info */}
          <FormSection title="Basic Information">
            <CustomInput
              label="FACILITY NAME"
              name="name"
              placeholder="e.g. Premium Football Ground"
              onChange={handleChange}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomSelect
                label="FACILITY TYPE"
                name="type"
                options={[
                  "Football",
                  "Cricket",
                  "Tennis",
                  "Badminton",
                  "Athletics",
                  "Boxing",
                  "Volleyball",
                  "Hockey",
                  "Swimming",
                ]}
                onChange={handleChange}
              />
              <CustomInput
                label="LOCATION"
                name="location"
                placeholder="Mirpur, Dhaka"
                icon={<HiOutlineLocationMarker size={20} />}
                onChange={handleChange}
                required
              />
            </div>
          </FormSection>

          {/* Section 2: Pricing & Capacity */}
          <FormSection title="Pricing & Capacity">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomInput
                label="PRICE PER HOUR"
                name="price"
                placeholder="৳ 0.00"
                onChange={handleChange}
                required
              />
              <CustomInput
                label="CAPACITY"
                name="capacity"
                placeholder="No. of people"
                icon={<span className="text-sm font-bold">👥</span>}
                onChange={handleChange}
                required
              />
            </div>
          </FormSection>

          {/* Section 3: Facility Image */}
          <FormSection title="Facility Image">
            <CustomInput
              label="PASTE IMAGE URL"
              name="image"
              placeholder="https://example.com/image.jpg"
              onChange={handleChange}
              required
            />
          </FormSection>

          {/* Section 4: Available Time Slots */}
          <FormSection title="Available Time Slots">
            <div className="flex justify-end gap-4 mb-4">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[10px] font-bold text-primary-container hover:underline cursor-pointer"
              >
                Select all
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-[10px] font-bold text-gray-400 hover:underline cursor-pointer"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {timeSlotsArray.map((slot) => (
                <TimeSlot
                  key={slot}
                  label={slot}
                  isSelected={selectedSlots.includes(slot)}
                  onClick={() => toggleSlot(slot)}
                />
              ))}
            </div>
          </FormSection>

          {/* Section 5: Description */}
          <FormSection title="Description">
            <div className="relative">
              <textarea
                name="description"
                rows="4"
                placeholder="Describe your facility..."
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary/5 transition-all"
              />
              <span className="absolute bottom-4 right-4 text-[10px] font-bold text-gray-300">
                {formData.description.length}/500
              </span>
            </div>
          </FormSection>

          {/* Section 6: Owner Info */}
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 mb-10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Owner Information (Auto-filled)
            </p>
            <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center gap-3">
              <HiOutlineEnvelope className="text-gray-300" />
              <span className="text-sm font-semibold text-gray-500">
                {user?.email}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-50">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-primary-container text-white rounded-xl text-sm font-bold hover:brightness-110 shadow-lg shadow-primary-container/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                "Adding..."
              ) : (
                <>
                  <FiPlusCircle size={18} /> Add Facility
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewFacilitiePage;
