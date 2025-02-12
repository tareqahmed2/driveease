import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useTheme } from "next-themes";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const [carData, setCarData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios
    setLoading(true);
    //   .get(`https://assignment11-server-side-mu.vercel.app/all-cars/${id}`)
    axiosSecure
      .get(`/all-cars/${id}`)
      .then((res) => {
        setCarData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleBooking = async (car) => {
    setShowModal(true);
    setSelectedCar(car);
  };

  const handleDateSelection = async () => {
    if (selectedCar.availability === "Unavailable") {
      Swal.fire({
        title: "Error",
        text: `${selectedCar.carModel} is not available right now!`,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
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
      .get(
        `https://assignment11-server-side-mu.vercel.app/all-bookings/${user.email}`
      )
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
              .patch(
                `https://assignment11-server-side-mu.vercel.app/all-cars/${selectedCar._id}`,
                {
                  bookingStatus: carWithEmail.bookingStatus,
                  ...carWithEmail,
                }
              )
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
            .post(
              "https://assignment11-server-side-mu.vercel.app/all-bookings",
              carWithEmail
            )
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
  const { theme } = useTheme();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-3xl" />
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto p-4">
      <Helmet>
        <title>DriveEase | CarDetails</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      {carData.map((car, index) => {
        return (
          <div
            key={car._id}
            className={`car-details border p-6 rounded-lg shadow-lg  ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            } mb-6 px-6 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
            } hover:shadow-xl transition-shadow`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
            >
              {car.carModel}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="car-image">
                <img
                  src={car.imageURL}
                  alt={car.carModel}
                  className="w-full h-full object-cover rounded-lg mb-4"
                />
              </div>
              <div className="car-info">
                <p
                  className={`text-2xl font-semibold mb-4 ${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }`}
                >
                  Price per Day: ${car.dailyRentalPrice}
                </p>
                <p
                  className={`  mb-2 ${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }`}
                >
                  Availability: {car.availability}
                </p>
                <p
                  className={`  mb-2 ${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }`}
                >
                  Features: {car.features}
                </p>
                <p
                  className={`  mb-2 ${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }`}
                >
                  {car.description}
                </p>
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
          <div
            className={`${
              theme === "light"
                ? "bg-white text-black"
                : "bg-gray-800 text-white"
            } p-6 mx-1 my-4 rounded-lg w-full md:w-96`}
          >
            <div className="car-image">
              <h2 className="text-2xl font-semibold mb-4">
                {selectedCar.carModel}
              </h2>
              <img
                src={selectedCar.imageURL}
                alt={selectedCar.carModel}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
            </div>

            <div className="mb-4">
              <h3 className="text-2xl font-semibold mb-4">
                Select Booking Dates
              </h3>
              <label htmlFor="startDate" className="block">
                Start Date (DD-MM-YYYY)
              </label>
              <input
                type="text"
                id="startDate"
                placeholder="DD-MM-YYYY"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`w-full p-2 border ${
                  theme === "light" ? "border-gray-300" : "border-gray-700"
                } rounded-md bg-${theme === "light" ? "white" : "gray-700"}`}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="endDate" className="block">
                End Date (DD-MM-YYYY)
              </label>
              <input
                type="text"
                id="endDate"
                placeholder="DD-MM-YYYY"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`w-full p-2 border ${
                  theme === "light" ? "border-gray-300" : "border-gray-700"
                } rounded-md bg-${theme === "light" ? "white" : "gray-700"}`}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className={`px-6 py-2 ${
                  theme === "light" ? "bg-gray-300" : "bg-gray-600"
                } text-white rounded-lg`}
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
