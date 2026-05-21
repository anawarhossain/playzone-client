import { cn } from "@/lib/utils";
import React, { forwardRef, useId } from "react";
import { IoIosArrowDown } from "react-icons/io";

const CustomSelect = forwardRef(
  (
    { label, options = [], placeholder = "Select option", className, ...props },
    ref,
  ) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"
          >
            {label}
          </label>
        )}

        <div className="relative group">
          <select
            id={id}
            ref={ref}
            className={cn(
              "w-full h-14 rounded-2xl bg-white border border-gray-200 px-4 pr-10 outline-none transition-all duration-300 appearance-none cursor-pointer",
              "focus:border-primary-container focus:ring-4 focus:ring-primary-container/10 hover:border-primary-container text-gray-700",
              className,
            )}
            {...props}
          >
            {/* ফিক্সড: ডিফল্ট প্লেসহোল্ডার অপশন */}
            <option value="">{placeholder}</option>

            {options.map((opt, index) => {
              const value = typeof opt === "string" ? opt : opt.value;
              const text = typeof opt === "string" ? opt : opt.label;
              return (
                <option key={index} value={value}>
                  {text}
                </option>
              );
            })}
          </select>

          <IoIosArrowDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:rotate-180 transition-transform duration-300" />
        </div>
      </div>
    );
  },
);

CustomSelect.displayName = "CustomSelect";
export default CustomSelect;
