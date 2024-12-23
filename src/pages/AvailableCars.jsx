import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AvailableCars = () => {
  const [availableCars, setAvailableCars] = useState([]);
  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const { setLoading } = useAuth();

  setLoading(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/all-cars")
      .then((res) => setAvailableCars(res.data));
  }, []);
  setLoading(false);

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
      return parseFloat(b.dailyRentalPrice) - parseFloat(b.dailyRentalPrice);
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

  return (
    <div className="container mx-auto p-4 w-11/12">
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
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price-ascending</option>
          <option value="price-des">Price-descending</option>
          <option value="bookingCount-asc">Booking Count-ascending</option>
          <option value="bookingCount-des">Booking Count=descending</option>
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
            className="car-card border p-4 rounded-lg shadow-lg bg-white"
          >
            <img
              src={car.imageURL}
              alt={car.carModel}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{car.carModel}</h3>
            <p className="text-gray-600">Price: ${car.dailyRentalPrice}/day</p>
            <p className="text-gray-600">Location: {car.location}</p>
            <p className="text-gray-600">Availability: {car.availability}</p>
            <button
              onClick={() => navigate(`/car-details/${car._id}`)}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg"
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
