import Image from "next/image";
import React from "react";

const HomeHero = () => {
  return (
    <div>
      <header className="relative h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-inverse-surface">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Hero background"
            className="w-full h-full object-cover opacity-40"
            src="/assets/stadium.png"
            fill
            loading="eager"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-6xl text-white font-bold mb-6 leading-tight">
            Book Your Perfect Sports Venue
          </h1>
          <p className="text-base md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Find and book top-rated sports facilities near you — football,
            cricket, badminton and more
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6 sm:px-0">
            <button className="w-full sm:w-auto px-10 py-4 bg-primary-container text-white font-bold rounded-xl text-lg hover:brightness-110 transition-all">
              Explore Facilities
            </button>
            <button className="w-full sm:w-auto px-10 py-4 border-2 border-white text-white font-bold rounded-xl text-lg hover:bg-white/10 transition-all">
              How It Works
            </button>
          </div>
        </div>

        {/* Stat Bar - Responsive Hidden on Mobile/Tablet */}
        <div className="absolute bottom-17 left-1/2 -translate-x-1/2 w-[75%] max-w-[1280px] bg-white rounded-2xl shadow-xl py-8 px-12 flex justify-center gap-12 md:gap-24 hidden lg:flex">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">500+</p>
            <p className="text-secondary text-xs uppercase tracking-wider font-semibold">
              Venues
            </p>
          </div>
          <div className="h-12 w-px bg-outline-variant"></div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">20+</p>
            <p className="text-secondary text-xs uppercase tracking-wider font-semibold">
              Sports
            </p>
          </div>
          <div className="h-12 w-px bg-outline-variant"></div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">10K+</p>
            <p className="text-secondary text-xs uppercase tracking-wider font-semibold">
              Bookings
            </p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomeHero;
