import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user, setLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modifiedBooking, setModifiedBooking] = useState(null);
  const [newBookingDate, setNewBookingDate] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/all-bookings/${user.email}`)
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

  const handleSaveModifiedData = () => {
    if (!newBookingDate) {
      Swal.fire("Error", "Please select a new date", "error");
      return;
    }

    axios
      .patch(`http://localhost:5000/updateBooking/${modifiedBooking._id}`, {
        dateAdded: newBookingDate,
      })
      .then((res) => {
        Swal.fire("Success", "Booking modified successfully", "success");
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === modifiedBooking._id
              ? { ...booking, dateAdded: newBookingDate }
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
    if (bookingToCancel.BookingStatus === "cancel") {
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
              ? { ...booking, BookingStatus: "cancel" }
              : booking
          )
        );

        setIsCancelModalOpen(false);
      })
      .catch((err) => console.error(err));
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

  return (
    <div className="container w-11/12 mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>
      <div className="overflow-x-auto">
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

                  <td className="border px-4 py-2">{booking.BookingStatus}</td>
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

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Modify Booking</h2>
            <label className="block mb-2">New Booking Date</label>
            <input
              type="date"
              value={newBookingDate}
              onChange={(e) => setNewBookingDate(e.target.value)}
              className="border p-2 mb-4 w-full"
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
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
