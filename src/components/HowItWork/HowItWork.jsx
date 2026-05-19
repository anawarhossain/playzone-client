import React from "react";
import { CiCalendar, CiPlay1, CiSearch } from "react-icons/ci";

const HowItWork = () => {
  return (
    <div>
      <section className="bg-surface-container-low py-24 mb-24">
        <div className="max-w-container-max mx-auto px-margin-desktop text-center">
          <h2 className=" text-3xl font-bold text-on-surface mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-outline-variant flex items-center justify-center mb-6 relative">
                <span className=" text-4xl text-primary" data-icon="search">
                  <CiSearch />
                </span>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary-container text-white font-bold rounded-full flex items-center justify-center border-4 border-surface-container-low">
                  1
                </div>
              </div>
              <h3 className="font-bold mb-2">Find a Facility</h3>
              <p className="text-secondary">
                Search from our wide range of premium sports venues by sport and
                location.
              </p>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-outline-variant flex items-center justify-center mb-6 relative">
                <span
                  className="material-symbols-outlined text-4xl text-primary"
                  data-icon="calendar_today"
                >
                  <CiCalendar />
                </span>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary-container text-white font-bold rounded-full flex items-center justify-center border-4 border-surface-container-low">
                  2
                </div>
              </div>
              <h3 className="font-bold mb-2">Book Your Slot</h3>
              <p className="text-secondary">
                Choose your preferred date and time, and complete booking in
                seconds.
              </p>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-outline-variant flex items-center justify-center mb-6 relative">
                <span
                  className="material-symbols-outlined text-4xl text-primary"
                  data-icon="play_circle"
                >
                  <CiPlay1 />
                </span>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-primary-container text-white font-bold rounded-full flex items-center justify-center border-4 border-surface-container-low">
                  3
                </div>
              </div>
              <h3 className="font-bold mb-2">Play &amp; Enjoy</h3>
              <p className="text-secondary">
                Show up at the venue and enjoy your game with teammates and
                friends.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWork;
