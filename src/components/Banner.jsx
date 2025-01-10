import React from "react";
import bgImg from "../assets/bg-img.jpg";
const Banner = () => {
  return (
    <div
      className="w-11/12 mx-auto my-10 rounded-2xl relative bg-cover bg-center bg-no-repeat py-40 text-white h-[60vh]"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50  rounded-2xl"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 shadow-lg">
          Drive Your Dreams Today!
        </h1>
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
  );
};

export default Banner;
