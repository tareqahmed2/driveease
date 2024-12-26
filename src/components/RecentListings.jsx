import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const RecentListings = () => {
  const [cars, setCars] = useState([]);
  const { setLoading } = useAuth();
  setLoading(true);

  useEffect(() => {
    axios
      .get("https://assignment11-server-side-mu.vercel.app/all-cars")
      .then((res) => {
        setCars(res.data.reverse().slice(0, 8));
      })
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);
  setLoading(false);

  return (
    <section className="my-16 px-6 w-11/12 mx-auto">
      <h2 className="text-4xl text-purple-800 font-semibold text-center mb-12">
        Recent Listings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <img
              src={car.imageURL}
              alt={car.carModel}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{car.carModel}</h3>
              <p className="text-gray-600 mb-2">${car.dailyRentalPrice}/day</p>
              <p
                className={`text-sm font-medium ${
                  car.availability === "Available"
                    ? "text-green-500"
                    : "text-red-500"
                } mb-2`}
              >
                {car.availability}
              </p>
              <p className="text-gray-500 text-sm">{car.dateAdded}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentListings;
