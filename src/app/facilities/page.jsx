"use client"
import FilterChip from '@/components/AllFacilities/FilterChip';
import Pagination from '@/components/AllFacilities/Pagination';
import FacilityCard from '@/components/FacilityCard/FacilityCard';
import CustomInput from '@/components/SearchBar/CustomInput';
import CustomSelect from '@/components/SearchBar/CustomSelect';
import React from 'react';
import { CiSearch } from 'react-icons/ci';

const AllFacilitiesPage = () => {

    const facilities = Array(9).fill({
      id: 1,
      title: "Elite Turf Arena",
      tag: "Football",
      rating: "4.8",
      location: "Uttara Sector 7, Dhaka",
      capacity: "14-16 Players",
      availability: "06:00 AM - 11:00 PM",
      price: "500",
      image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258",
    });

    return (
      <main className="bg-surface min-h-screen pb-20">
        {/* Header Section */}
        <div className="bg-white/50 border-b border-gray-100 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold text-primary-container uppercase tracking-widest mb-2">
              Home / All Facilities
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900">
              All Facilities
            </h1>
            <p className="text-gray-500 mt-2">
              Find and book from 500+ sports venues
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-6 md:p-8 border border-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="md:col-span-1">
                <CustomInput
                  label="Keywords"
                  placeholder="Search by facility name..."
                  icon={<CiSearch size={20} />}
                />
              </div>
              <CustomSelect
                label="Sport Type"
                options={["Football", "Cricket", "Tennis"]}
              />
              <CustomSelect
                label="Price Range"
                options={["Under 500", "500 - 1000", "Above 1000"]}
              />
              <button className="h-14 bg-primary-container text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-primary-container/20 cursor-pointer">
                Search
              </button>
            </div>

            {/* Active Filter Chips */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-gray-50">
              <FilterChip label="Football" onRemove={() => {}} />
              <FilterChip label="Under 500" onRemove={() => {}} />
              <button className="text-xs font-bold text-gray-400 hover:text-red-500 underline underline-offset-4 ml-2">
                Clear all
              </button>
            </div>
          </div>
        </section>

        {/* Results Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">12</span> of{" "}
            <span className="font-bold text-gray-900">48</span> facilities
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Sort by —</span>
            <select className="bg-transparent text-sm font-bold text-gray-900 outline-none cursor-pointer">
              <option>Price</option>
              <option>Rating</option>
            </select>
          </div>
        </section>

        {/* Facilities Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((f, i) => (
              <FacilityCard key={i} {...f} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination />
        </section>
      </main>
    );
};

export default AllFacilitiesPage;