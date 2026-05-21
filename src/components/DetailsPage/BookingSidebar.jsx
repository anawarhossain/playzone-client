// components/DetailsPage/BookingSidebar.jsx
"use client";
import { useState } from "react";
import { HiOutlineClock, HiOutlineShieldCheck } from "react-icons/hi";
import CustomInput from "../SearchBar/CustomInput";
import CustomSelect from "../SearchBar/CustomSelect";

const BookingSidebar = ({ facility }) => {
  const [hours, setHours] = useState(1);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const totalPrice = facility.price * hours;

  const handleBooking = () => {
    if (!date || !slot) return alert("Please select date and time slot!");
    // এখানে বুকিং এপিআই কল হবে
    console.log({ facilityId: facility._id, date, slot, hours, totalPrice });
    alert("Proceeding to payment...");
  };

  return (
    <div className="sticky top-28 space-y-6">
      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-50 p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-black text-gray-800">
            Book This Facility
          </h3>
          <p className="text-2xl font-black text-gray-900">
            ৳{facility.price}
            <span className="text-xs text-gray-400 font-normal"> / hr</span>
          </p>
        </div>

        <div className="space-y-5">
          <CustomInput
            label="Facility Name"
            value={facility.name}
            readOnly
            className="bg-gray-50"
          />
          <CustomInput
            label="Booking Date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
            icon={<HiOutlineClock size={20} />}
          />
          <CustomSelect
            label="Select Time Slot"
            options={facility.availableSlots || ["No Slots Available"]}
            onChange={(e) => setSlot(e.target.value)}
          />

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Number of Hours
            </label>
            <div className="flex items-center justify-between border border-gray-100 rounded-2xl p-2 bg-gray-50">
              <button
                onClick={() => setHours(Math.max(1, hours - 1))}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-100 cursor-pointer font-bold"
              >
                -
              </button>
              <span className="font-black text-gray-800">{hours}</span>
              <button
                onClick={() => setHours(hours + 1)}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-100 cursor-pointer font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="bg-primary/5 rounded-2xl p-5 space-y-3 mt-8 border border-primary/10">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                ৳{facility.price} x {hours} hours
              </span>
              <span className="font-bold text-gray-900">৳{totalPrice}</span>
            </div>
            <div className="pt-3 border-t border-primary/10 flex justify-between items-center">
              <span className="text-gray-900 font-black">Total Amount</span>
              <span className="text-xl font-black text-primary-container">
                ৳{totalPrice}
              </span>
            </div>
          </div>

          <button
            onClick={handleBooking}
            className="w-full py-4 bg-primary-container text-white font-black rounded-2xl shadow-xl shadow-primary-container/20 hover:brightness-110 transition-all active:scale-95 cursor-pointer"
          >
            Confirm Booking
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex gap-4 items-center">
        <HiOutlineShieldCheck className="text-primary-container" size={32} />
        <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
          Your booking is protected by our secure payment system.
        </p>
      </div>
    </div>
  );
};

export default BookingSidebar;
