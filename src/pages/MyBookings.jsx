import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/all-bookings/${user.email}`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.error(err));
  }, [user.email]);
  const handleModifyData = () => {};
  const handleCancelBooking = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/deleteBooked/${id}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire(
              "Cancelled!",
              "Your booking has been cancelled.",
              "success"
            );
            setBookings((prev) => prev.filter((booking) => booking._id !== id));
          })
          .catch((err) => console.error(err));
      }
    });
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
    <div className="container w-11/12 mx-auto p-4 ">
      <h2 className="text-2xl font-semibold mb-6">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Car Image</th>
              <th className="border px-4 py-2">Car Model</th>
              <th className="border px-4 py-2">Daily Price</th>
              <th className="border px-4 py-2">Booking Date</th>
              <th className="border px-4 py-2">Duration</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Taxes (10%)</th>
              <th className="border px-4 py-2">Booking Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const bookingDate = new Date(booking.dateAdded).toLocaleString();
              const duration = calculateDuration(
                booking.dateAdded,
                booking.currentDate
              );
              const totalPrice =
                booking.dailyRentalPrice * (booking.bookingCount || 1);
              const taxes = totalPrice * 0.1;

              return (
                <tr key={booking._id}>
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
                  <td className="border px-4 py-2">{bookingDate}</td>
                  <td className="border px-4 py-2">{duration}</td>
                  <td className="border px-4 py-2">${totalPrice.toFixed(2)}</td>
                  <td className="border px-4 py-2">${taxes.toFixed(2)}</td>
                  <td className="border px-4 py-2">{booking.BookingStatus}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={handleModifyData}
                      className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                      Modify
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
