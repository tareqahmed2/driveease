import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const [carData, setCarData] = useState([]);
  const { setLoading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
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

  const handleBooking = async (car) => {
    setShowModal(true);
    setSelectedCar(car);
  };

  const handleDateSelection = async () => {
    if (!startDate || !endDate) {
      Swal.fire({
        title: "Error",
        text: "Please select both start and end dates.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (
      !/^\d{2}-\d{2}-\d{4}$/.test(startDate) ||
      !/^\d{2}-\d{2}-\d{4}$/.test(endDate)
    ) {
      Swal.fire({
        title: "Error",
        text: "Please enter the date in DD-MM-YYYY format.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const [startDay, startMonth, startYear] = startDate.split("-");
    const [endDay, endMonth, endYear] = endDate.split("-");

    const startDateObj = new Date(`${startMonth}-${startDay}-${startYear}`);
    const endDateObj = new Date(`${endMonth}-${endDay}-${endYear}`);

    if (endDateObj < startDateObj) {
      Swal.fire({
        title: "Invalid Dates",
        text: "End date cannot be earlier than start date.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const options = {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    const formatter = new Intl.DateTimeFormat("en-GB", options);

    const currentTimeInDhaka = formatter.format(new Date());
    const totalPrice =
      parseFloat(selectedCar.dailyRentalPrice) +
      parseFloat(selectedCar.dailyRentalPrice * 0.1);

    const carWithEmail = {
      CarId: selectedCar._id,
      addedBy: selectedCar.addedBy,
      availability: selectedCar.availability,
      bookingCount: selectedCar.bookingCount,
      carModel: selectedCar.carModel,
      dailyRentalPrice: selectedCar.dailyRentalPrice,
      dateAdded: selectedCar.dateAdded,
      description: selectedCar.description,
      features: selectedCar.features,
      imageURL: selectedCar.imageURL,
      location: selectedCar.location,
      vehicleRegistrationNumber: selectedCar.vehicleRegistrationNumber,
      email: user.email,
      totalPrice: totalPrice,
      currentDate: currentTimeInDhaka,
      startDate: startDate,
      endDate: endDate,
      bookingStatus: "Confirmed",
    };

    axios
      .get(`http://localhost:5000/all-bookings/${user.email}`)
      .then((res) => {
        const existingBooking = res.data.find(
          (booking) =>
            booking.CarId === selectedCar._id && booking.email === user.email
        );

        if (existingBooking) {
          Swal.fire({
            title: "Already Booked!",
            text: `You have already booked the ${selectedCar.carModel}.`,
            icon: "info",
            confirmButtonText: "OK",
          });
          setAlreadyBooked(true);
          navigate("/my-bookings");

          return;
        } else {
          setAlreadyBooked(false);

          if (!alreadyBooked) {
            axios
              .patch(`http://localhost:5000/all-cars/${selectedCar._id}`, {
                bookingStatus: carWithEmail.bookingStatus,
                ...carWithEmail,
              })
              .then((res) => {
                if (res.status === 200) {
                  console.log(
                    "Car booking count and status updated successfully!"
                  );
                }
                console.log(res.data);
              })
              .catch((error) => {
                console.error(
                  "Error updating car booking count or status:",
                  error
                );
              });
          }

          axios
            .post("http://localhost:5000/all-bookings", carWithEmail)
            .then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Booking Confirmed!",
                  text: `You have successfully booked the ${selectedCar.carModel}.`,
                  icon: "success",
                  confirmButtonText: "OK",
                });
              }
              setShowModal(false);
              navigate("/my-bookings");
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
      {carData.map((car, index) => {
        return (
          <div
            key={car._id}
            className={`car-details border p-6 rounded-lg shadow-lg bg-white mb-6 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
            } hover:shadow-xl transition-shadow`}
          >
            <h2 className="text-2xl font-semibold mb-4">{car.carModel}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="car-image">
                <img
                  src={car.imageURL}
                  alt={car.carModel}
                  className="w-full h-72 object-cover rounded-lg mb-4"
                />
              </div>
              <div className="car-info">
                <p className="text-xl font-semibold">
                  Price per Day: ${car.dailyRentalPrice}
                </p>
                <p className="text-gray-600">
                  Availability: {car.availability}
                </p>
                <p className="text-gray-600 mt-2">Features: {car.features}</p>
                <p className="text-gray-600 mt-2">{car.description}</p>
                <button
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg"
                  onClick={() => handleBooking(car)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal for date selection */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-2xl font-semibold mb-4">
              Select Booking Dates
            </h3>
            <div className="mb-4">
              <label htmlFor="startDate" className="block text-gray-700">
                Start Date (DD-MM-YYYY)
              </label>
              <input
                type="text"
                id="startDate"
                placeholder="DD-MM-YYYY"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endDate" className="block text-gray-700">
                End Date (DD-MM-YYYY)
              </label>
              <input
                type="text"
                id="endDate"
                placeholder="DD-MM-YYYY"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-300 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Validate the date format before confirming
                  if (
                    !/^\d{2}-\d{2}-\d{4}$/.test(startDate) ||
                    !/^\d{2}-\d{2}-\d{4}$/.test(endDate)
                  ) {
                    toast.warn("Please enter the date in DD-MM-YYYY format.");
                    return;
                  }
                  handleDateSelection();
                }}
                className="px-6 py-2 bg-green-500 text-white rounded-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
