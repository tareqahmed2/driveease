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
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  setLoading(false);

  const handleBooking = (car) => {
    const currentDate = new Date().toISOString(); //
    const totalPrice =
      parseFloat(car.dailyRentalPrice) + parseFloat(car.dailyRentalPrice * 0.1);
    console.log(car);
    const carWithEmail = {
      CarId: car._id,
      addedBy: car.addedBy,
      availability: car.availability,
      bookingCount: car.bookingCount,
      carModel: car.carModel,
      dailyRentalPrice: car.dailyRentalPrice,
      dateAdded: car.dateAdded,
      description: car.description,
      features: car.features,
      imageURL: car.imageURL,
      location: car.location,
      vehicleRegistrationNumber: car.vehicleRegistrationNumber,
      email: user.email,
      totalPrice: totalPrice,
      currentDate: currentDate,
      BookingStatus: "pending",
    };

    axios
      .get(`http://localhost:5000/all-bookings/${user.email}`)
      .then((res) => {
        const existingBooking = res.data.find(
          (booking) => booking._id === car._id
        );

        if (existingBooking) {
          Swal.fire({
            title: "Already Booked!",
            text: `You have already booked the ${car.carModel}.`,
            icon: "info",
            confirmButtonText: "OK",
          });
        } else {
          axios
            .post("http://localhost:5000/all-bookings", carWithEmail)
            .then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Booking Confirmed!",
                  text: `You have successfully booked the ${car.carModel}.`,
                  icon: "success",
                  confirmButtonText: "OK",
                });
              }
            })
            .catch((error) => {
              console.error(error.message);
            });
        }
      })
      .catch((error) => {
        console.error(error.message);
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
