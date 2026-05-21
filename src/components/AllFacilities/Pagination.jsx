// components/AllFacilities/Pagination.jsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const Pagination = ({ totalPages, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`/facilities?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-xl border border-gray-200 text-gray-500 disabled:opacity-30 hover:bg-gray-50 cursor-pointer"
      >
        <IoChevronBackOutline size={20} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-10 h-10 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            currentPage === page
              ? "bg-primary-container text-white shadow-lg shadow-primary-container/30"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-xl border border-gray-200 text-gray-500 disabled:opacity-30 hover:bg-gray-50 cursor-pointer"
      >
        <IoChevronForwardOutline size={20} />
      </button>
    </div>
  );
};

export default Pagination;
