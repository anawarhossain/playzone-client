// components/HomeFacilityCard.jsx
import React from "react";
import FacilityCard from "./FacilityCard";
import SectionHeader from "./SectionHeader";
import MotionGrid from "./MotionGrid"; // নতুন ইমপোর্ট
import MotionScroll from "./MotionScroll";
import InfiniteMarquee from "./InfiniteMarquee";

const HomeFacilityCard = () => {
  const MOCK_DATA = [
    {
      id: 1,
      title: "Emerald Sky Arena",
      tag: "Football",
      rating: "4.8",
      location: "Central Park, New York",
      price: "45",
      image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258",
    },
    {
      id: 2,
      title: "Riverside Tennis Club",
      tag: "Tennis",
      rating: "4.9",
      location: "Waterfront, Miami",
      price: "35",
      image:
        "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&q=80",
    },
    {
      id: 3,
      title: "Victory Indoor Hub",
      tag: "Basketball",
      rating: "4.7",
      location: "Downtown, Chicago",
      price: "55",
      image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258",
    },
  ];

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Featured Facilities"
          linkText="View All"
          href="/facilities"
        />

              {/* অ্যানিমেটেড গ্রিড ব্যবহার */}
              
        <InfiniteMarquee speed={30}>
          {MOCK_DATA.map((facility) => (
            <FacilityCard key={facility.id} {...facility} />
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
};

export default HomeFacilityCard;
