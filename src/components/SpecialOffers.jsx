import React from "react";
import { motion } from "framer-motion";

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
];

const SpecialOffers = () => {
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
            <a
              href={offer.link}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Learn More...
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
