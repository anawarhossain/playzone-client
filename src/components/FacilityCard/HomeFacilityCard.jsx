// components/HomeFacilityCard.jsx
import React from "react";
import FacilityCard from "./FacilityCard";
import SectionHeader from "./SectionHeader";
import MotionGrid from "./MotionGrid"; // নতুন ইমপোর্ট
import MotionScroll from "./MotionScroll";
import InfiniteMarquee from "./InfiniteMarquee";
import { getAllFacilities } from "@/app/lib/data";

const HomeFacilityCard = async() => {

  const {facilities} = await getAllFacilities()
  console.log(facilities, "home page facilities")


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
          {facilities.map((f) => (
            <FacilityCard
              key={f._id}
              id={f._id}
              {...f}
              title={f.name}
              tag={f.type}
              rating="4.8"
            />
          ))}
        </InfiniteMarquee>
      </div>
    </section>
  );
};

export default HomeFacilityCard;
