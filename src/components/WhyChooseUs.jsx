import React from "react";
import {
  FaCar,
  FaDollarSign,
  FaClipboardCheck,
  FaHeadset,
} from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="my-16 px-6 w-11/12 mx-auto">
      <h2 className="text-3xl  text-center mb-12 text-purple-800 font-bold">
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Wide Variety of Cars */}
        <div className="flex flex-col items-center text-center">
          <FaCar className="text-5xl text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Wide Variety of Cars</h3>
          <p className="text-gray-600">
            From budget-friendly options to luxury vehicles, we have something
            for everyone.
          </p>
        </div>

        {/* Affordable Prices */}
        <div className="flex flex-col items-center text-center">
          <FaDollarSign className="text-5xl text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
          <p className="text-gray-600">
            Competitive daily rates you can count on, making your rental
            cost-effective.
          </p>
        </div>

        {/* Easy Booking Process */}
        <div className="flex flex-col items-center text-center">
          <FaClipboardCheck className="text-5xl text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Booking Process</h3>
          <p className="text-gray-600">
            Seamlessly book your ride in just a few clicks, making your
            experience hassle-free.
          </p>
        </div>

        {/* Customer Support */}
        <div className="flex flex-col items-center text-center">
          <FaHeadset className="text-5xl text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
          <p className="text-gray-600">
            24/7 assistance for all your queries to ensure you're always taken
            care of.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
