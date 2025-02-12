import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useTheme } from "next-themes";

const AvailableCars = () => {
  const [availableCars, setAvailableCars] = useState([]);
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme(); // Hook for managing theme

  useEffect(() => {
    axios
      .get("https://assignment11-server-side-mu.vercel.app/all-cars")
      .then((res) => {
        setAvailableCars(res.data);
        setLoading(false);
      });
  }, []);

  const filteredCars = availableCars.filter((car) => {
    return (
      car.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === "price-asc") {
      return parseFloat(a.dailyRentalPrice) - parseFloat(b.dailyRentalPrice);
    }
    if (sortBy === "price-des") {
      return parseFloat(b.dailyRentalPrice) - parseFloat(a.dailyRentalPrice);
    }
    if (sortBy === "bookingCount-asc") {
      return a.bookingCount - b.bookingCount;
    }
    if (sortBy === "bookingCount-des") {
      return b.bookingCount - a.bookingCount;
    }
    return 0;
  });

  const toggleView = () => {
    setView(view === "grid" ? "list" : "grid");
  };

  if (loading) {
    return (
      <div className="flex justify-center max-w-screen-xl mx-auto items-center min-h-screen">
        <FaSpinner className="animate-spin text-3xl text-black" />
      </div>
    );
  }

  return (
    <div
      className={`max-w-7xl my-10 mx-auto p-4 rounded-lg ${
        theme === "light"
          ? "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      } text-white`}
    >
      <Helmet>
        <title>DriveEase | Available Cars</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div>
        <h2 className="text-purple-600 text-center font-extrabold text-4xl mb-5">
          Our Available Cars
        </h2>
        <p className="w-4/5 mx-auto text-center text-gray-600 mb-12">
          Browse through our diverse collection of vehicles, carefully selected
          to meet your travel needs. Whether you're looking for an economy car,
          a luxurious sedan, or a spacious SUV, we have the perfect ride to
          ensure comfort and style for every journey.
        </p>
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by model or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full"
        />
      </div>

      <button
        onClick={toggleView}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Switch to {view === "grid" ? "List" : "Grid"} View
      </button>

      <div className="mb-4">
        <select
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
          className={`px-4 py-2 border rounded-lg ${
            theme === "light"
              ? "text-gray-800 bg-white"
              : "bg-gray-800 text-white"
          }`}
        >
          <option
            className={`${
              theme === "light"
                ? "text-gray-800 bg-white"
                : "bg-gray-800 text-white"
            }`}
            value=""
          >
            Sort By
          </option>
          <option
            className={`${theme === "light" ? "text-gray-800" : "text-white"}`}
            value="price-asc"
          >
            Price-ascending
          </option>
          <option
            className={`${theme === "light" ? "text-gray-800" : "text-white"}`}
            value="price-des"
          >
            Price-descending
          </option>
          <option
            className={`${theme === "light" ? "text-gray-800" : "text-white"}`}
            value="bookingCount-asc"
          >
            Booking Count-ascending
          </option>
          <option
            className={`${theme === "light" ? "text-gray-800" : "text-white"}`}
            value="bookingCount-des"
          >
            Booking Count-descending
          </option>
        </select>
      </div>

      <div
        className={`${
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "block"
        }`}
      >
        {sortedCars.map((car) => (
          <div
            key={car._id}
            className={`car-card p-4 mb-2 rounded-lg shadow-lg ${
              theme === "light"
                ? "bg-white border-gray-300"
                : "bg-gray-800 border-gray-700"
            }`}
          >
            <img
              src={car.imageURL}
              alt={car.carModel}
              className={`${
                view === "grid" ? "w-full h-48 object-cover" : "w-full h-full"
              } rounded-lg mb-4`}
            />
            <h3
              className={`text-xl font-semibold ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              {car.carModel}
            </h3>
            <p
              className={`${
                theme === "light" ? "text-gray-600" : "text-white"
              }`}
            >
              Price: ${car.dailyRentalPrice}/day
            </p>
            <p
              className={`${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
            >
              Location: {car.location}
            </p>
            <p
              className={`${
                theme === "light" ? "text-gray-600" : "text-white"
              }`}
            >
              Booking Count: {car.bookingCount}
            </p>

            <button
              onClick={() => navigate(`/car-details/${car._id}`)}
              className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-800 text-white rounded-lg"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
