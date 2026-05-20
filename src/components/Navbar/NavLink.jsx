"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, label, isMobile, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "transition-all duration-300 flex items-center",
        // ডেস্কটপ স্টাইল
        !isMobile && "text-sm font-medium pb-1 border-b-2",
        !isMobile && isActive
          ? "text-primary border-primary font-bold"
          : "text-secondary border-transparent hover:text-primary",

        // মোবাইল স্টাইল (এটিই আপনার সমস্যা সমাধান করবে)
        isMobile && "w-full px-4 py-3 rounded-xl text-base font-semibold",
        isMobile && isActive
          ? "bg-primary/10 text-primary"
          : "text-gray-600 hover:bg-gray-50",
      )}
    >
      {label}
    </Link>
  );
};

export default NavLink;