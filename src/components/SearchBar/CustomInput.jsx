import { cn } from "@/lib/utils";
import React, { forwardRef, useId } from "react";

const CustomInput = forwardRef(
  ({ label, icon, error, className, value, ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-semibold text-gray-600 ml-1"
          >
            {label}
          </label>
        )}

        <div className="relative group">
          <input
            id={id}
            ref={ref}
            value={value || ""}
            className={cn(
              "w-full h-14 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200 px-4 outline-none transition-all duration-300",
              "focus:border-primary-container focus:ring-4 focus:ring-blue-100 hover:border-primary-container text-gray-700",
              icon ? "pl-12" : "pl-4",
              error && "border-red-500 focus:ring-red-100",
              className,
            )}
            {...props}
          />

          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
              {icon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";
export default CustomInput;
