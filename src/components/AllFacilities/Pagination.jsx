// components/Pagination.jsx
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

const Pagination = () => (
  <div className="flex items-center justify-center gap-2 mt-12">
    <button className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
      <IoChevronBackOutline size={20} />
    </button>
    {[1, 2, 3, 4, 5].map((page) => (
      <button
        key={page}
        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${page === 1 ? "bg-primary-container text-white shadow-lg shadow-primary-container/30" : "text-gray-500 hover:bg-gray-50"}`}
      >
        {page}
      </button>
    ))}
    <button className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
      <IoChevronForwardOutline size={20} />
    </button>
  </div>
);

export default Pagination;
