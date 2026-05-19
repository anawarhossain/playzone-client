"use client";
import React, { useState } from "react";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";

const SPORT_OPTIONS = [
  { label: "Select Sport", value: "" },
  { label: "Football", value: "football" },
  { label: "Cricket", value: "cricket" },
  { label: "Tennis", value: "tennis" },
];

const SearchBar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call logic
    console.log("Searching...");
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <section className="relative z-20 px-4 -mt-16 mb-20">
      <form
        onSubmit={handleSearch}
        className="max-w-7xl mx-auto rounded-3xl bg-white/80 backdrop-blur-xl border border-white/30 shadow-2xl p-6 md:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
          <div className="md:col-span-4">
            <CustomSelect label="Sport Type" options={SPORT_OPTIONS} required />
          </div>

          <div className="md:col-span-5">
            <CustomInput
              label="Location"
              placeholder="Enter city or area"
              icon={<CiLocationOn size={22} />}
              required
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-14 rounded-2xl bg-primary-container text-white font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95 cursor-pointer`}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CiSearch size={20} />
                  <span>Search Facilities</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
