// app/facilities/page.jsx
import React from "react";
import { getAllFacilities } from "../lib/data";
import FacilityCard from "@/components/FacilityCard/FacilityCard";
import Pagination from "@/components/AllFacilities/Pagination";
import SearchFilters from "@/components/SearchBar/SearchFilters";

const AllFacilitiesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const { facilities, totalPages, currentPage, totalCount } =
    await getAllFacilities(params);

  return (
    <main className="bg-surface min-h-screen pb-20">
      <div className="bg-white/50 border-b border-gray-100 py-10 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">
            All Facilities
          </h1>
          <p className="text-gray-500 mt-2">
            Find and book from {facilities.length}+ sports venues
          </p>
        </div>
      </div>

      <SearchFilters />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((f) => (
            <FacilityCard
              key={f._id}
              id={f._id}
              {...f}
              title={f.name}
              tag={f.type}
              rating="4.8"
            />
          ))}
        </div>
        {facilities.length === 0 && (
          <p className="text-center py-20 text-gray-400">
            No facilities found matching your search.
          </p>
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={parseInt(currentPage)}
        />
      </section>
    </main>
  );
};

export default AllFacilitiesPage;
