import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";

const RecentListings = () => {
  const [cars, setCars] = useState([]);
  const { setLoading } = useAuth();
  setLoading(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://assignment11-server-side-mu.vercel.app/all-cars")
      .then((res) => {
        setCars(res.data.reverse().slice(0, 8));
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);
  setLoading(false);
  const calculateDaysAgo = (dateAdded) => {
    if (!dateAdded) {
      return "Date not available";
    }

    try {
      const regex =
        /^(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}):(\d{2}) (AM|PM)$/i;
      const match = dateAdded.match(regex);

      if (!match) {
        return "Invalid date format";
      }

      const [_, day, month, year, hours, minutes, seconds, period] = match;

      let hour = parseInt(hours, 10);
      if (period === "PM" && hour !== 12) {
        hour += 12;
      } else if (period === "AM" && hour === 12) {
        hour = 0;
      }

      const formattedDate = new Date(
        `${year}-${month}-${day}T${hour
          .toString()
          .padStart(2, "0")}:${minutes}:${seconds}`
      );

      if (isNaN(formattedDate.getTime())) {
        return "Invalid date";
      }

      const currentDate = new Date();
      const differenceInTime = currentDate - formattedDate;
      const differenceInDays = Math.floor(
        differenceInTime / (1000 * 60 * 60 * 24)
      );

      return differenceInDays === 0
        ? "Added today"
        : `Added ${differenceInDays} days ago`;
    } catch (error) {
      console.error("Error parsing date:", error);
      return "Error calculating days ago";
    }
  };
  const handleNavigate = () => {
    navigate("/available-cars");
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  const { theme } = useTheme();
  return (
    <section className="my-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl text-purple-800 font-semibold text-center mb-4">
        Recent Listings
      </h2>
      <p
        className={` text-xl text-center  mb-12 ${
          theme === "light" ? "text-gray-600" : "text-white"
        }`}
      >
        Explore our recent listings of top-quality, well-maintained vehicles,
        perfect for every journey and occasion.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {cars.map((car) => (
          <div
            key={car._id}
            className={` shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <img
              src={car.imageURL}
              alt={car.carModel}
              className="w-full h-48 object-cover"
            />
            {/* <div
              className="w-full h-48  bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${car.imageURL})` }}
            ></div> */}
            <div className="p-4">
              <h3
                className={` text-xl mb-2 ${
                  theme === "light" ? "text-gray-600" : "text-white"
                }`}
              >
                {car.carModel}
              </h3>
              <p
                className={` mb-2 ${
                  theme === "light" ? "text-gray-600" : "text-white"
                }`}
              >
                Per Day Price: ${car.dailyRentalPrice}/day
              </p>
              <p
                className={`text-sm font-medium ${
                  car.availability === "Available"
                    ? "text-green-500"
                    : "text-red-500"
                } mb-2`}
              >
                {car.availability}
              </p>
              <p
                className={`text-sm mb-2 ${
                  theme === "light" ? "text-gray-600" : "text-white"
                }`}
              >
                Booking Count:{car.bookingCount}
              </p>

              <p
                className={`text-sm mb-2 ${
                  theme === "light" ? "text-gray-600" : "text-white"
                }`}
              >
                {calculateDaysAgo(car.dateAdded)}
              </p>
              <button
                onClick={() => handleNavigate()}
                className="btn btn-primary my-3 hover:btn-success"
              >
                See More...
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentListings;
