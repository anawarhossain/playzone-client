"use client";
import FormSection from "@/components/AddFacilitie/FormSection";
import TimeSlot from "@/components/AddFacilitie/TimeSlot";
import CustomInput from "@/components/SearchBar/CustomInput";
import CustomSelect from "@/components/SearchBar/CustomSelect";
import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { HiOutlineCloudUpload, HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";



const AddNewFacilitiePage = () => {

    const [selectedSlots, setSelectedSlots] = useState([
      "6AM-8AM",
      "10AM-12PM",
      "4PM-6PM",
      "6PM-8PM",
    ]);
    const [isAvailable, setIsAvailable] = useState(true);

    const timeSlots = [
      "6AM-8AM",
      "8AM-10AM",
      "10AM-12PM",
      "12PM-2PM",
      "2PM-4PM",
      "4PM-6PM",
      "6PM-8PM",
      "8PM-10PM",
    ];

    return (
      <div className="min-h-screen bg-surface p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
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

          {/* Main Form Card */}
          <form className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-50">
            {/* Section 1: Basic Info */}
            <FormSection title="Basic Information">
              <CustomInput
                label="FACILITY NAME"
                placeholder="e.g. Premium Football Ground"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomSelect
                  label="FACILITY TYPE"
                  options={["Football", "Cricket", "Tennis", "Badminton"]}
                />
                <CustomInput
                  label="LOCATION"
                  placeholder="Mirpur, Dhaka"
                  icon={<HiOutlineLocationMarker size={20} />}
                />
              </div>
            </FormSection>

            {/* Section 2: Pricing & Capacity */}
            <FormSection title="Pricing & Capacity">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <CustomInput label="PRICE PER HOUR" placeholder="৳ 0.00" />
                <CustomInput
                  label="CAPACITY"
                  placeholder="No. of people"
                  icon={<span className="text-sm font-bold">👥</span>}
                />

                {/* Custom Toggle Switch */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-[10px] font-black text-gray-400 uppercase">
                    Available
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAvailable(!isAvailable)}
                    className={`w-12 h-6 rounded-full transition-all relative ${isAvailable ? "bg-primary-container" : "bg-gray-300"}`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAvailable ? "left-7" : "left-1"}`}
                    />
                  </button>
                </div>
              </div>
            </FormSection>

            {/* Section 3: Facility Image */}
            <FormSection title="Facility Image">
              <div className="border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="bg-primary/10 p-4 rounded-full text-primary-container mb-4 group-hover:scale-110 transition-transform">
                  <HiOutlineCloudUpload size={32} />
                </div>
                <p className="text-gray-700 font-bold text-sm">
                  Click to upload or drag & drop
                </p>
                <p className="text-gray-400 text-[10px] mt-1 uppercase font-semibold">
                  Supports: JPG, PNG (Max. 5MB)
                </p>
              </div>
              {/* Image Placeholder */}
              <div className="w-full h-40 bg-gray-100 rounded-2xl overflow-hidden relative grayscale opacity-50 border border-gray-100">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold italic text-sm">
                  Image Preview Area
                </div>
              </div>
              <CustomInput
                label="OR PASTE IMAGE URL"
                placeholder="https://example.com/image.jpg"
              />
            </FormSection>

            {/* Section 4: Available Time Slots */}
            <FormSection title="Available Time Slots">
              <div className="flex justify-end gap-4 mb-4">
                <button
                  type="button"
                  className="text-[10px] font-bold text-primary-container hover:underline"
                >
                  Select all
                </button>
                <button
                  type="button"
                  className="text-[10px] font-bold text-gray-400 hover:underline"
                >
                  Clear all
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeSlots.map((slot) => (
                  <TimeSlot
                    key={slot}
                    label={slot}
                    isSelected={selectedSlots.includes(slot)}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </FormSection>

            {/* Section 5: Description */}
            <FormSection title="Description">
              <div className="relative">
                <textarea
                  rows="4"
                  placeholder="Describe your facility, rules, nearby landmarks..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm outline-none focus:border-primary-container focus:ring-4 focus:ring-primary/5 transition-all"
                />
                <span className="absolute bottom-4 right-4 text-[10px] font-bold text-gray-300">
                  0/500
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
                  admin@playzone.com
                </span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t border-gray-50">
              <button
                type="button"
                className="px-8 py-3.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 bg-primary-container text-white rounded-xl text-sm font-bold hover:brightness-110 shadow-lg shadow-primary-container/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <FiPlusCircle size={18} />
                Add Facility
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default AddNewFacilitiePage;