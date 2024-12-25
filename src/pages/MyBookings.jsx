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
  const { user, setLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modifiedBooking, setModifiedBooking] = useState(null);
  const [newBookingDate, setNewBookingDate] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [startUpdateDate, setStartUpdateDate] = useState(null);
  const [endUpdateDate, setEndUpdateDate] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      // .get(`http://localhost:5000/all-bookings/${user.email}`)
      .get(`all-bookings/${user.email}`)
      .then((res) => {
        setBookings(res.data);
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
      .patch(`http://localhost:5000/updateBooking/${modifiedBooking._id}`, {
        startDate: startUpdateDate,
        endDate: endUpdateDate,
      })
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
      .patch(`http://localhost:5000/updateStatus/${bookingToCancel._id}`)
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
        `http://localhost:5000/updateAvailableBookingCount/${bookingToCancel.CarId}`
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

  return (
    <div className="container w-11/12 mx-auto p-4">
      <h2 className="text-3xl text-center text-purple-600 font-semibold mb-6">
        My Bookings
      </h2>

      <div className="overflow-x-auto mb-6">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-400 text-white">
              <th className="border px-4 py-2 font-semibold">Car Image</th>
              <th className="border px-4 py-2 font-semibold">Car Model</th>
              <th className="border px-4 py-2 font-semibold">Daily Price</th>
              <th className="border px-4 py-2 font-semibold">Booking Date</th>
              <th className="border px-4 py-2 font-semibold">Start Date</th>
              <th className="border px-4 py-2 font-semibold">End data</th>
              <th className="border px-4 py-2 font-semibold">Total Price</th>
              <th className="border px-4 py-2 font-semibold">Booking Status</th>
              <th className="border px-4 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => {
              const duration = calculateDuration(
                booking.dateAdded,
                booking.currentDate
              );

              return (
                <tr
                  key={booking._id}
                  className={`${
                    index % 2 === 0 ? "bg-purple-400" : "bg-sky-500"
                  } hover:bg-blue-200 transition-colors`}
                >
                  <td className="border px-4 py-2">
                    <img
                      src={booking.imageURL}
                      alt={booking.carModel}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="border px-4 py-2">{booking.carModel}</td>
                  <td className="border px-4 py-2">
                    ${booking.dailyRentalPrice}
                  </td>
                  <td className="border px-4 py-2">{booking.currentDate}</td>
                  <td className="border px-4 py-2">{booking.startDate}</td>
                  <td className="border px-4 py-2">{booking.endDate}</td>
                  <td className="border px-4 py-2">
                    ${booking.totalPrice.toFixed(2)}
                  </td>

                  <td className="border px-4 py-2">{booking.bookingStatus}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleModifyData(booking)}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      Modify Date
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      onClick={() => handleCancelBooking(booking)}
                    >
                      Cancel Booking
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="">
        <Line data={chartData} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Modify Booking</h2>
            <label className="block mb-2">New Start Date</label>
            <input
              type="text"
              id="startDate"
              placeholder="DD-MM-YYYY"
              onChange={(e) => setStartUpdateDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <label className="block mb-2">New End Date</label>
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
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModifiedData}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isCancelModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
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
