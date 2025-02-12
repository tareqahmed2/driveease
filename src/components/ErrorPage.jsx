import React from "react";
import { useNavigate } from "react-router-dom";
import error from "../assets/error.jpg";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 my-8">
      <div
        className="
      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
      flex flex-col items-center justify-center min-h-screen text-center rounded-lg"
      >
        {/* Animated Image */}
        <div className="mb-6">
          <img
            src={error}
            alt="404 Error Animation"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-xl border-4 border-white transform hover:scale-150 transition-all duration-500"
          />
        </div>

        <p className="text-2xl md:text-3xl mb-8 font-light text-gray-200">
          Oops! We couldn’t find the page you’re looking for.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="px-8 py-4 bg-white text-indigo-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-indigo-50 hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
