import { IoIosAdd } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

// constants/navigation.js
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/facilities", label: "All Facilities" },
];

export const USER_DROPDOWN_LINKS = [
  { href: "/dashboard", label: "My Bookings", icon: <SlCalender /> },
  { href: "/dashboard/new", label: "Add Facility", icon: <IoIosAdd /> },
  {
    href: "/facilities-manage",
    label: "Manage My Facilities",
    icon: <MdDashboard />,
  },
];
