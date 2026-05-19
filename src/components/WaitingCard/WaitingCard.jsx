import React from 'react';

const WaitingCard = () => {
    return (
      <div>
        <section className="max-w-container-max mx-auto px-margin-desktop mb-24">
          <div className="bg-primary-container rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
            <h2 className="relative z-10 font-headline-lg text-4xl md:text-5xl text-white mb-6">
              Ready to Play? Book Your Slot Today!
            </h2>
            <p className="relative z-10 text-white/90 text-xl mb-10 max-w-xl mx-auto">
              Join thousands of players and start your sports journey with
              PlayZone. The field is waiting for you.
            </p>
            <button className="relative z-10 px-12 py-5 border-2 border-white text-white font-bold rounded-2xl text-xl hover:bg-white hover:text-primary-container transition-all active:scale-95">
              Get Started Now
            </button>
          </div>
        </section>
      </div>
    );
};

export default WaitingCard;