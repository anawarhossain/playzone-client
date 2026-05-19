// components/SectionHeader.jsx
import Link from "next/link";

const SectionHeader = ({ title, linkText, href }) => (
  <div className="flex justify-between items-end mb-8 md:mb-12">
    <div className="space-y-2">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
        {title}
      </h2>
      <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
    </div>

    {href && (
      <Link
        href={href}
        className="text-blue-600 font-bold text-sm sm:text-base hover:text-blue-700 transition-colors flex items-center gap-1 group"
      >
        {linkText}
        <span className="group-hover:translate-x-1 transition-transform">
          &rarr;
        </span>
      </Link>
    )}
  </div>
);

export default SectionHeader;
