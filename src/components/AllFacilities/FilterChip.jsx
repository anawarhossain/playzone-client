// components/FilterChip.jsx
import { IoCloseOutline } from "react-icons/io5";

const FilterChip = ({ label, onRemove }) => (
  <div className="flex items-center gap-2 bg-primary/5 text-primary-container px-3 py-1.5 rounded-full text-xs font-semibold border border-primary-container/20">
    {label}
    <button
      onClick={onRemove}
      className="hover:bg-primary/10 rounded-full transition-colors cursor-pointer"
    >
      <IoCloseOutline size={16} />
    </button>
  </div>
);

export default FilterChip;
