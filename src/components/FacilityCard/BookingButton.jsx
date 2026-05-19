// components/BookingButton.jsx
"use client";




const BookingButton = ({ id }) => {
  const handleBooking = (e) => {
    e.preventDefault(); // লিংকের ডিফল্ট বিহেভিয়ার বন্ধ করবে
    // e.stopPropagation(); // প্যারেন্ট লিংকে ক্লিক ইভেন্ট যাওয়া বন্ধ করবে
    console.log(`Booking facility with ID: ${id}`);
    // এখানে আপনার বুকিং লজিক
  };

  return (
      <button
        onClick={handleBooking}
        className="bg-primary-container hover:bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 cursor-pointer shadow-sm shadow-blue-200"
      >
        Book Now
      </button>
  );
};

export default BookingButton;
