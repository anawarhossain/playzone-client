"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, label, mobile, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "transition-all duration-200 font-medium",
        mobile
          ? "py-3 px-4 rounded-xl flex items-center w-full text-base"
          : "text-sm pb-1 border-b-2 transition-all",
        isActive
          ? "text-primary border-primary font-bold bg-primary/5 md:bg-transparent"
          : "text-secondary border-transparent hover:text-primary",
      )}
    >
      {label}
    </Link>
  );
};

export default NavLink;