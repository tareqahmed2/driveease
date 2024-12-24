import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Example car data
const specialOffers = [
  {
    id: 1,
    title: "Get 15% off for weekend rentals!",
    description: "Book now and save on your weekend getaway!",
    link: "/offers/weekend-rentals",
  },
  {
    id: 2,
    title: "Luxury cars at $99/day this holiday season!",
    description: "Drive in style this holiday season at an unbeatable price!",
    link: "/offers/luxury-cars",
  },
  {
    id: 3,
    title: "20% off on all SUVs for a limited time!",
    description: "Take on the road with an SUV and enjoy a 20% discount!",
    link: "/offers/suv-discount",
  },
  {
    id: 4,
    title: "Family-friendly car rentals with free GPS!",
    description: "Book a family car and get a free GPS navigation system.",
    link: "/offers/family-cars",
  },
  {
    id: 5,
    title: "Weekend Getaway Package: $50 off!",
    description: "Plan your weekend trip and save $50 on your booking!",
    link: "/offers/weekend-getaway",
  },
  {
    id: 6,
    title: "Winter Special: Rent an SUV and get 10% off!",
    description: "Perfect for winter travels, get 10% off on SUV rentals.",
    link: "/offers/winter-suvs",
  },
  {
    id: 7,
    title: "Rent a convertible for $59/day this summer!",
    description:
      "Feel the breeze in a convertible at an affordable price this summer!",
    link: "/offers/summer-convertibles",
  },
  {
    id: 8,
    title: "Book a minivan and get 15% off for long rentals!",
    description: "Rent a minivan for longer durations and get a 15% discount.",
    link: "/offers/minivan-discount",
  },
  {
    id: 9,
    title: "Free additional driver with every luxury car rental!",
    description: "Get an extra driver at no cost when you rent a luxury car.",
    link: "/offers/free-driver",
  },
  {
    id: 10,
    title: "Student discount: 10% off on all car rentals!",
    description: "Students can enjoy a 10% discount on any rental car!",
    link: "/offers/student-discount",
  },
  {
    id: 11,
    title: "Rent a car for 7 days and get the 8th day free!",
    description: "Book for a week and get one extra day of rental for free!",
    link: "/offers/7-for-8",
  },
  {
    id: 12,
    title: "Special offer: Get 20% off on weekend rentals!",
    description: "Weekend plans? Get 20% off when you book for the weekend!",
    link: "/offers/20-off-weekend",
  },
];

const SpecialOffers = () => {
  const navigate = useNavigate();
  return (
    <section className="my-16 px-6">
      <h2 className="text-4xl font-semibold text-center mb-12">
        Special Offers
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {specialOffers.map((offer) => (
          <motion.div
            key={offer.id}
            className="w-full sm:w-80 bg-white rounded-lg shadow-xl p-8 flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { type: "spring", stiffness: 500, damping: 10 },
            }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {offer.title}
            </h3>
            <p className="text-gray-600 mb-6">{offer.description}</p>
            <button
              onClick={() => {
                navigate("/available-cars");
              }}
              href={offer.link}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
