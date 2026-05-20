import { IoIosPerson, IoIosSettings } from "react-icons/io";
import { SlCalender } from "react-icons/sl";

// constants/navigation.js
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/facilities", label: "All Facilities" },
  { href: "/dashboard", label: "Dashboard" },
];

export const USER_DROPDOWN_LINKS = [
  { href: "/profile", label: "My Profile", icon: <IoIosPerson /> },
  { href: "/my-bookings", label: "My Bookings", icon: <SlCalender /> },
  { href: "/settings", label: "Settings", icon: <IoIosSettings /> },
];
