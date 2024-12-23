import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { Result } from "postcss";

const CarDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [carData, setCarData] = useState([]);
  const { setLoading } = useAuth();

  setLoading(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/all-cars/${id}`)
      .then((res) => {
        setCarData(res.data);
      })

      .catch((err) => console.error(err));
  }, []);
  setLoading(false);

  const handleBooking = (car) => {
    const carWithEmail = {
      ...car,
      email: user.email,
    };

    axios
      .post("http://localhost:5000/all-bookings", carWithEmail)
      .then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Booking Confirmed!",
            text: `You have successfully booked the ${car.carModel}.`,
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      });
  };

  return (
    <div className="container w-11/12 mx-auto p-4">
      {carData.map((car) => {
        return (
          <div
            key={car._id}
            className="car-details border p-6 rounded-lg shadow-lg bg-white mb-6"
          >
            <h2 className="text-2xl font-semibold mb-4">{car.carModel}</h2>
            <img
              src={car.imageURL}
              alt={car.carModel}
              className="w-full h-72 object-cover rounded-lg mb-4"
            />
            <p className="text-xl font-semibold">
              Price per Day: ${car.dailyRentalPrice}
            </p>
            <p className="text-gray-600">Availability: {car.availability}</p>
            <p className="text-gray-600 mt-2">Features: {car.features}</p>
            <p className="text-gray-600 mt-2">{car.description}</p>
            <button
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg"
              onClick={() => handleBooking(car)}
            >
              Book Now
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CarDetails;
