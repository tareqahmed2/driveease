import React from "react";
import { useNavigate } from "react-router-dom";
import error from "../assets/error.jpg";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white w-11/12 mx-auto">
      {/* Animated Image */}
      <div className="mb-6">
        <img
          src={error}
          alt="404 Error Animation"
          className="w-20 h-20 rounded-full shadow-xl border-4 border-white transform hover:scale-150 transition-all duration-500"
        />
      </div>

      <p className="text-2xl mb-8 font-light text-gray-200">
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
  );
};

export default ErrorPage;
