import React from 'react';
import { CiFootball } from 'react-icons/ci';
import { FaBasketballBall } from 'react-icons/fa';
import { GiTennisRacket } from 'react-icons/gi';
import { IoIosFootball } from 'react-icons/io';
import { MdOutlineSportsTennis, MdSportsCricket, MdSportsScore } from 'react-icons/md';
import { TbSwimming } from 'react-icons/tb';

const HomeSportsSection = () => {
    return (
      <div>
        <section className="max-w-container-max mx-auto px-margin-desktop mb-24">
          <h2 className="text-3xl font-bold text-on-surface mb-12 text-center">
            Browse by Sport
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white p-8 rounded-2xl border-2 border-transparent hover:border-primary-container hover:shadow-lg transition-all text-center group cursor-pointer">
              <span
                className="material-symbols-outlined text-5xl text-secondary group-hover:text-primary transition-colors mb-4"
                data-icon="sports_soccer"
              >
                <IoIosFootball className="mx-auto" />
              </span>
              <p className="font-bold text-on-surface">Football</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-transparent hover:border-primary-container hover:shadow-lg transition-all text-center group cursor-pointer">
              <span
                className="material-symbols-outlined text-5xl text-secondary group-hover:text-primary transition-colors mb-4"
                data-icon="sports_cricket"
              >
                <MdSportsCricket className="mx-auto" />
              </span>
              <p className="font-bold text-on-surface">Cricket</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-transparent hover:border-primary-container hover:shadow-lg transition-all text-center group cursor-pointer">
              <span
                className="material-symbols-outlined text-5xl text-secondary group-hover:text-primary transition-colors mb-4"
                data-icon="sports_basketball"
              >
                <FaBasketballBall className="mx-auto" />
              </span>
              <p className="font-bold text-on-surface">Basketball</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-transparent hover:border-primary-container hover:shadow-lg transition-all text-center group cursor-pointer">
              <span
                className="material-symbols-outlined text-5xl text-secondary group-hover:text-primary transition-colors mb-4"
                data-icon="sports_tennis"
              >
                <GiTennisRacket className="mx-auto" />
              </span>
              <p className="font-bold text-on-surface">Badminton</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-transparent hover:border-primary-container hover:shadow-lg transition-all text-center group cursor-pointer">
              <span
                className="material-symbols-outlined text-5xl text-secondary group-hover:text-primary transition-colors mb-4"
                data-icon="sports_tennis"
              >
                <MdOutlineSportsTennis className="mx-auto" />
              </span>
              <p className="font-bold text-on-surface">Tennis</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-transparent hover:border-primary-container hover:shadow-lg transition-all text-center group cursor-pointer">
              <span
                className="material-symbols-outlined text-5xl text-secondary group-hover:text-primary transition-colors mb-4"
                data-icon="pool"
              >
                <TbSwimming className="mx-auto" />
              </span>
              <p className="font-bold text-on-surface">Swimming</p>
            </div>
          </div>
        </section>
      </div>
    );
};

export default HomeSportsSection;