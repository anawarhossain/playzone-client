// components/AllFacilities/SearchFilters.jsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";

const SearchFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (search) params.set("search", search);
    else params.delete("search");
    router.push(`/facilities?${params.toString()}`);
  };

  const handleTypeChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", e.target.value);
    router.push(`/facilities?${params.toString()}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
      <div className="bg-white rounded-[2.5rem] shadow-xl p-6 md:p-8 border border-gray-50 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <CustomInput
            label="Keywords"
            placeholder="Search facility..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            icon={<CiSearch size={20} />}
          />
        </div>
        <div className="w-full md:w-48">
          <CustomSelect
            label="Sport Type"
            options={["All", "Football", "Cricket", "Tennis"]}
            onChange={handleTypeChange}
          />
        </div>
        <button
          onClick={handleSearch}
          className="h-14 px-10 bg-primary-container text-white font-bold rounded-2xl hover:brightness-110 transition-all cursor-pointer"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default SearchFilters;
