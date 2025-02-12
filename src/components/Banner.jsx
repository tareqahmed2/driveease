import React from "react";
import bgImg from "../assets/bg-img.jpg";
import { useTheme } from "next-themes";
const Banner = () => {
  const { theme } = useTheme();
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div
        className=" mx-auto my-10 rounded-2xl relative bg-cover bg-center bg-no-repeat py-40 text-white h-[60vh]"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50  rounded-2xl"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="sm:text-xl text-2xl md:text-6xl font-bold mb-6 shadow-lg">
            Drive Your Dreams Today!
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-xl sm:max-w-2xl px-4">
            Start your journey with the best cars on the market. Explore a wide
            range of vehicles that fit your needs, style, and budget. Find your
            perfect match today!
          </p>
          <button
            onClick={() => {
              window.location.href = "/available-cars";
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 text-lg rounded-md hover:from-purple-500 hover:to-blue-500 transition-transform transform hover:scale-105 shadow-xl"
          >
            View Available Cars
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
