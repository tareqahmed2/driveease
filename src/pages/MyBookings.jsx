import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useTheme } from "next-themes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modifiedBooking, setModifiedBooking] = useState(null);
  const [newBookingDate, setNewBookingDate] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [startUpdateDate, setStartUpdateDate] = useState(null);
  const [endUpdateDate, setEndUpdateDate] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      // .get(`https://assignment11-server-side-mu.vercel.app/all-bookings/${user.email}`)
      .get(
        `https://assignment11-server-side-mu.vercel.app/all-bookings/${user.email}`
      )
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [user.email]);
  const handleModifyData = (booking) => {
    setModifiedBooking(booking);
    setNewBookingDate(booking.dateAdded);
    setIsModalOpen(true);
  };

  const isValidDateFormat = (dateString) => {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    return regex.test(dateString);
  };

  const handleSaveModifiedData = () => {
    if (!startUpdateDate || !endUpdateDate) {
      Swal.fire("Error", "Please select both new start and end dates", "error");
      return;
    }

    if (
      !isValidDateFormat(startUpdateDate) ||
      !isValidDateFormat(endUpdateDate)
    ) {
      Swal.fire(
        "Error",
        "Please enter valid dates in DD-MM-YYYY format",
        "error"
      );
      return;
    }

    const startDateObj = new Date(
      startUpdateDate.split("-").reverse().join("-")
    );
    const endDateObj = new Date(endUpdateDate.split("-").reverse().join("-"));

    if (endDateObj < startDateObj) {
      Swal.fire("Error", "End date cannot be earlier than start date", "error");
      return;
    }

    axios
      .patch(
        `https://assignment11-server-side-mu.vercel.app/updateBooking/${modifiedBooking._id}`,
        {
          startDate: startUpdateDate,
          endDate: endUpdateDate,
        }
      )
      .then((res) => {
        Swal.fire("Success", "Booking modified successfully", "success");
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === modifiedBooking._id
              ? {
                  ...booking,
                  startDate: startUpdateDate,
                  endDate: endUpdateDate,
                }
              : booking
          )
        );
        setIsModalOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const handleCancelBooking = (booking) => {
    setBookingToCancel(booking);
    setIsCancelModalOpen(true);
  };

  const confirmCancelBooking = () => {
    if (bookingToCancel.bookingStatus === "Cancelled") {
      Swal.fire(
        "Already Cancelled",
        "This booking has already been cancelled.",
        "info"
      );
      return;
    }
    axios
      .patch(
        `https://assignment11-server-side-mu.vercel.app/updateStatus/${bookingToCancel._id}`
      )
      .then((res) => {
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");

        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingToCancel._id
              ? { ...booking, bookingStatus: "Cancelled" }
              : booking
          )
        );

        setIsCancelModalOpen(false);
      })
      .catch((err) => console.error(err));
    axios
      .patch(
        `https://assignment11-server-side-mu.vercel.app/updateAvailableBookingCount/${bookingToCancel.CarId}`
      )
      .then((res) => console.log(res.data));
  };

  const calculateDuration = (dateAdded, currentDate) => {
    const addedDate = new Date(dateAdded);
    const nowDate = new Date(currentDate);

    const durationMs = nowDate - addedDate;
    const days = Math.floor(durationMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  const chartData = {
    labels: bookings.map((booking) => booking.carModel),
    datasets: [
      {
        label: "Daily Rental Price",
        data: bookings.map((booking) => booking.dailyRentalPrice),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-3xl" />
      </div>
    );
  }
  const { theme } = useTheme();
  return (
    <div className="max-w-7xl mx-auto p-6 my-10">
      <Helmet>
        <title>DriveEase | My Booking</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>

      <h2 className="text-3xl text-center text-purple-600 font-semibold mb-6">
        My Bookings
      </h2>
      <div className="overflow-x-auto mb-6">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th
                className={`border px-4 py-2 font-semibold whitespace-nowrap ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Car Image
              </th>
              <th
                className={`border px-4 py-2 font-semibold whitespace-nowrap ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Car Model
              </th>
              <th
                className={`border px-4 py-2 font-semibold whitespace-nowrap ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Daily Price
              </th>
              <th
                className={`border px-4 py-2 font-semibold whitespace-nowrap ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Booking Date
              </th>
              <th
                className={`border px-4 py-2 font-semibold whitespace-nowrap ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Start Date
              </th>
              <th
                className={`border px-4 py-2 font-semibold whitespace-nowrap ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                End Date
              </th>
              <th
                className={`border px-4 py-2 font-semibold whitespace-nowrap ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Total Price
              </th>
              <th
                className={`border px-4 py-2 font-semibold whitespace-nowrap ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Booking Status
              </th>
              <th
                className={`border px-4 py-2 font-semibold whitespace-nowrap ${
                  theme === "light" ? "text-gray-800" : "text-white"
                }`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking._id}
                className={`${
                  index % 2 === 0 ? "bg-purple-400" : "bg-sky-500"
                } hover:bg-blue-200 transition-colors`}
              >
                <td
                  className={`${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }
                  border px-4 py-2 whitespace-nowrap`}
                >
                  <img
                    src={booking.imageURL}
                    alt={booking.carModel}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </td>
                <td
                  className={`${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }
                  border px-4 py-2 whitespace-nowrap`}
                >
                  {booking.carModel}
                </td>
                <td
                  className={`${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }
                  border px-4 py-2 whitespace-nowrap`}
                >
                  ${booking.dailyRentalPrice}
                </td>
                <td
                  className={`${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }
                  border px-4 py-2 whitespace-nowrap`}
                >
                  {booking.currentDate}
                </td>
                <td
                  className={`${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }
                  border px-4 py-2 whitespace-nowrap`}
                >
                  {booking.startDate}
                </td>
                <td
                  className={`${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }
                  border px-4 py-2 whitespace-nowrap`}
                >
                  {booking.endDate}
                </td>
                <td
                  className={`${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }
                  border px-4 py-2 whitespace-nowrap`}
                >
                  ${booking.totalPrice.toFixed(2)}
                </td>
                <td
                  className={`${
                    theme === "light" ? "text-gray-800" : "text-white"
                  }
                  border px-4 py-2 whitespace-nowrap`}
                >
                  {booking.bookingStatus}
                </td>
                <td className=" px-4 py-2 whitespace-nowrap flex   space-x-2">
                  <button
                    onClick={() => handleModifyData(booking)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    aria-label="Modify Booking"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleCancelBooking(booking)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    aria-label="Cancel Booking"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="">
        <Line data={chartData} />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div
            className={` p-6 rounded-lg ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
            >
              Modify Booking
            </h2>
            <label
              className={`text-sm font-semibold mb-4 ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
            >
              New Start Date
            </label>
            <input
              type="text"
              id="startDate"
              placeholder="DD-MM-YYYY"
              onChange={(e) => setStartUpdateDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <label
              className={`text-sm font-semibold mb-4 ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
            >
              New End Date
            </label>
            <input
              type="text"
              id="endDate"
              placeholder="DD-MM-YYYY"
              onChange={(e) => setEndUpdateDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 my-3 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModifiedData}
                className="bg-blue-500 text-white px-4 py-2 my-3 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isCancelModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div
            className={` p-6 rounded-lg ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                theme === "light" ? "text-gray-800" : "text-white"
              }`}
            >
              Are you sure you want to cancel this booking?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                No
              </button>
              <button
                onClick={confirmCancelBooking}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
