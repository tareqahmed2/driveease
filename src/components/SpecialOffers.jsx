import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

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
    title: "Free GPS with all bookings this month!",
    description:
      "Navigate your journey with a free GPS included in your rental!",
    link: "/offers/free-gps",
  },
  {
    id: 5,
    title: "Up to 30% off on long-term rentals!",
    description: "The longer you rent, the more you save!",
    link: "/offers/long-term-rentals",
  },
  {
    id: 6,
    title: "Special offer: Rent one, get one free!",
    description: "Rent a car and get another free for a limited time!",
    link: "/offers/rent-one-get-one",
  },
  {
    id: 7,
    title: "20% off for first-time renters!",
    description: "New to us? Enjoy a 20% discount on your first rental!",
    link: "/offers/first-time-renters",
  },
  {
    id: 8,
    title: "Weekend getaway special: $49/day for compact cars!",
    description:
      "Perfect for a short trip, rent a compact car for just $49/day!",
    link: "/offers/weekend-getaway",
  },
  {
    id: 9,
    title: "Free insurance upgrade on premium cars!",
    description: "Rent a premium car and enjoy a free insurance upgrade!",
    link: "/offers/premium-insurance-upgrade",
  },
  {
    id: 10,
    title: "50% off on luxury SUV rentals for the holidays!",
    description:
      "Make your holidays memorable with a luxury SUV at half the price!",
    link: "/offers/holiday-luxury-suv",
  },
  {
    id: 11,
    title: "Family package: Rent a minivan and save 25%!",
    description:
      "Planning a family trip? Rent a minivan and save on your rental!",
    link: "/offers/family-package",
  },
  {
    id: 12,
    title: "Free additional driver for all bookings this week!",
    description: "Take the stress off the road with a free additional driver!",
    link: "/offers/free-driver",
  },
];

const SpecialOffers = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleNavigate = () => {
    navigate("/available-cars");
    window.scrollTo(0, 0);
  };

  return (
    <section className="my-16 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-semibold text-center mb-5 text-purple-500">
        Special Offers
      </h2>
      <p
        className={`text-center w-4/5 mx-auto mb-12 transition-colors duration-300 ${
          theme === "light" ? "text-gray-700" : "text-gray-300"
        }`}
      >
        Unlock exclusive deals and discounts on car rentals! Explore our
        limited-time offers designed to give you the best value for your next
        trip. Don’t miss out on these fantastic savings and book your ride
        today!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {specialOffers.map((offer) => (
          <motion.div
            key={offer.id}
            className={`card w-full bg-base-100 shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { type: "spring", stiffness: 500, damping: 10 },
            }}
          >
            <div className="card-body text-center">
              <h2
                className={`card-title text-gray-800 transition-colors duration-300 ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                {offer.title}
              </h2>
              <p
                className={`text-gray-600 transition-colors duration-300 ${
                  theme === "light" ? "text-gray-600" : "text-white"
                }`}
              >
                {offer.description}
              </p>
              <div className="card-actions justify-center mt-4">
                <button
                  onClick={() => handleNavigate()}
                  className="btn btn-primary hover:btn-accent"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;
