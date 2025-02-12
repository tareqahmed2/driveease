import { useTheme } from "next-themes";
import React from "react";
import {
  FaCar,
  FaDollarSign,
  FaClipboardCheck,
  FaHeadset,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const { theme } = useTheme();

  // Dark Mode & Light Mode Text Colors
  const headingColor =
    theme === "light" ? "text-purple-800" : "text-purple-400";
  const textColor = theme === "light" ? "text-gray-900" : "text-gray-300";
  const descriptionColor =
    theme === "light" ? "text-gray-600" : "text-gray-400";

  return (
    <section className="my-16 px-6 max-w-7xl mx-auto">
      {/* Title */}
      <h2
        className={`text-3xl md:text-4xl text-center mb-3 font-bold ${headingColor}`}
      >
        Why Choose Us?
      </h2>
      <p className={`text-center text-lg sm:text-xl mb-6 sm:mb-8 ${textColor}`}>
        Your trusted partner for reliable, affordable, and hassle-free car
        rental services, tailored to meet your every need.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-12">
        {/* Wide Variety of Cars */}
        <div className="flex flex-col items-center text-center">
          <FaCar className="text-5xl text-blue-500 mb-4" />
          <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
            Wide Variety of Cars
          </h3>
          <p className={`${descriptionColor}`}>
            From budget-friendly options to luxury vehicles, we have something
            for everyone.
          </p>
        </div>

        {/* Affordable Prices */}
        <div className="flex flex-col items-center text-center">
          <FaDollarSign className="text-5xl text-green-500 mb-4" />
          <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
            Affordable Prices
          </h3>
          <p className={`${descriptionColor}`}>
            Competitive daily rates you can count on, making your rental
            cost-effective.
          </p>
        </div>

        {/* Easy Booking Process */}
        <div className="flex flex-col items-center text-center">
          <FaClipboardCheck className="text-5xl text-yellow-500 mb-4" />
          <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
            Easy Booking Process
          </h3>
          <p className={`${descriptionColor}`}>
            Seamlessly book your ride in just a few clicks, making your
            experience hassle-free.
          </p>
        </div>

        {/* Customer Support */}
        <div className="flex flex-col items-center text-center">
          <FaHeadset className="text-5xl text-purple-500 mb-4" />
          <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
            Customer Support
          </h3>
          <p className={`${descriptionColor}`}>
            24/7 assistance for all your queries to ensure you're always taken
            care of.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
