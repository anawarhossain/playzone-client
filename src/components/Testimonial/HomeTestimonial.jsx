import React from 'react';
import TestimonialCard from './TestimonialCard';
import MotionGrid from '../FacilityCard/MotionGrid';

const HomeTestimonial = () => {
    const TESTIMONIALS_DATA = [
      {
        id: 1,
        name: "Michael Chen",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        rating: 5,
        comment:
          "The easiest booking experience I've ever had. Found a great badminton court within minutes and the process was seamless.",
      },
      {
        id: 2,
        name: "Sarah Jenkins",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        rating: 5,
        comment:
          "Finally, a platform that lists all the best local turf locations. The instant confirmation saves so much time coordinating with the team.",
      },
      {
        id: 3,
        name: "David Miller",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        rating: 5,
        comment:
          "Excellent customer service when I had to reschedule. The UI is clean and very easy to navigate on mobile devices too.",
      },
    ];
    return (
      <div>
        <section className="bg-[#E9F5EE] py-20 md:py-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-gray-900">
                What Our Players Say
              </h2>
              {/* নিচের ছোট বারটি অপশনাল */}
              <div className="w-20 h-1.5 bg-primary/20 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Testimonials Grid using Framer Motion */}
            <MotionGrid>
              {TESTIMONIALS_DATA.map((testimonial) => (
                <TestimonialCard key={testimonial.id} {...testimonial} />
              ))}
            </MotionGrid>
          </div>
        </section>
      </div>
    );
};

export default HomeTestimonial;