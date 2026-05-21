// components/DetailsPage/BookingSidebar.jsx
"use client";
import { useState } from "react";
import { HiOutlineClock, HiOutlineShieldCheck } from "react-icons/hi";
import CustomInput from "../SearchBar/CustomInput";
import CustomSelect from "../SearchBar/CustomSelect";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { createBooking } from "@/app/lib/action";

const BookingSidebar = ({ facility }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [hours, setHours] = useState(1);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const totalPrice = Number(facility.price) * hours;

  const handleBooking = async () => {
    // ১. ইউজার লগইন করা আছে কি না চেক
    if (!user) {
      alert("Please login first to book a facility!");
      return router.push("/login");
    }

    // ২. ইনপুট ভ্যালিডেশন
    if (!date || !slot || slot === "Select Time Slot") {
      return alert("Please select a valid date and time slot.");
    }

    setLoading(true);

    // ৩. বুকিং অবজেক্ট তৈরি
    const bookingData = {
      facilityId: facility._id,
      facilityName: facility.name,
      image: facility.image,
      userEmail: user.email,
      userName: user.name,
      date,
      slot,
      hours,
      price: totalPrice,
      sport: facility.type,
      location: facility.location,
    };

    try {
      const result = await createBooking(bookingData);

      if (result.success) {
        alert("Booking Confirmed Successfully!");
        router.push("/booking"); // ইউজারকে তার বুকিং লিস্টে পাঠিয়ে দেওয়া
      } else {
        alert(result.message || "Booking failed. Try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }

    // এখানে বুকিং এপিআই কল হবে
    // console.log({ facilityId: facility._id, date, slot, hours, totalPrice });
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
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            icon={<HiOutlineClock size={20} />}
          />
          <CustomSelect
            label="Select Time Slot"
            options={facility.availableSlots || ["No Slots Available"]}
            onChange={(e) => setSlot(e.target.value)}
          />

          {/* Duration Selector */}
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

          {/* Summary Area */}
          <div className="bg-primary/5 rounded-2xl p-5 space-y-3 mt-8 border border-primary/10">
            <div className="flex justify-between text-sm text-gray-600 font-medium">
              <span>
                ৳{facility.price} x {hours} hr
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
            disabled={loading}
            className="w-full py-4 bg-primary-container text-white font-black rounded-2xl shadow-xl shadow-primary-container/20 hover:brightness-110 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
          <p className="text-center text-[10px] text-gray-400 font-bold uppercase">
            Secure payment gateway
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex gap-4 items-center">
        <HiOutlineShieldCheck className="text-primary-container" size={32} />
        <div>
          <p className="text-xs font-black text-gray-800">Payment Security</p>
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
            Protected by SSL Encryption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;
