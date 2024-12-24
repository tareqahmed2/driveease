import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const MyCars = () => {
  const { user, setLoading } = useAuth();
  const email = user.email;
  const [cars, setCars] = useState([]);
  const [sortOrder, setSortOrder] = useState("dateDesc");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [carModel, setCarModel] = useState("");
  const [dailyRentalPrice, setDailyRentalPrice] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [description, setDescription] = useState("");

  setLoading(true);
  useEffect(() => {
    axios.get(`http://localhost:5000/my-cars/${email}`).then((res) => {
      setCars(res.data);
      sortCars(sortOrder, res.data);
    });
  }, [email, sortOrder]);
  setLoading(false);

  const sortCars = (order, data = cars) => {
    const sortedCars = [...data].sort((a, b) => {
      if (order === "dateDesc") {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      } else if (order === "dateAsc") {
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      } else if (order === "priceAsc") {
        return parseFloat(a.dailyRentalPrice) - parseFloat(b.dailyRentalPrice);
      } else if (order === "priceDesc") {
        return parseFloat(b.dailyRentalPrice) - parseFloat(a.dailyRentalPrice);
      }
      return 0;
    });
    setCars(sortedCars);
  };

  const handleSortChange = (e) => {
    const newOrder = e.target.value;
    setSortOrder(newOrder);
    sortCars(newOrder);
  };

  const handleEdit = (car) => {
    setCurrentCar(car);
    setCarModel(car.carModel);
    setDailyRentalPrice(car.dailyRentalPrice);
    setAvailability(car.availability);
    setDescription(car.description);
    setModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedCar = {
      carModel,
      dailyRentalPrice,
      availability,
      description,
    };

    axios
      .patch(`http://localhost:5000/my-cars/${currentCar._id}`, updatedCar)
      .then((res) => {
        if (res.data.modifiedCount) {
          setCars((cars) =>
            cars.map((car) =>
              car._id === currentCar._id ? { ...car, ...updatedCar } : car
            )
          );
          setModalOpen(false);
          Swal.fire({
            title: "Updated!",
            text: "Your car details have been updated.",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "There was an error updating the car details.",
          icon: "error",
        });
      });
  };

  const handleDelete = (carId) => {
    setDeleteModalOpen(true);
    setCurrentCar(carId);
    console.log(carId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/my-cars/${carId}`).then((res) => {
          if (res.data.deletedCount) {
            setCars((cars) => cars.filter((car) => car._id !== carId));
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-8">My Cars</h2>

        {cars.length === 0 ? (
          <div className="text-center">
            <p>
              No cars added yet.{" "}
              <a href="/add-car" className="text-blue-500">
                Add a new car
              </a>
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <div>
                <label htmlFor="sortOptions" className="mr-2">
                  Sort by:
                </label>
                <select
                  id="sortOptions"
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="select select-bordered"
                >
                  <option value="dateDesc">Date Added (Newest First)</option>
                  <option value="dateAsc">Date Added (Oldest First)</option>
                  <option value="priceAsc">Price (Lowest First)</option>
                  <option value="priceDesc">Price (Highest First)</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Car Image</th>
                    <th className="border border-gray-300 p-2">Car Model</th>
                    <th className="border border-gray-300 p-2">
                      Daily Rental Price
                    </th>
                    <th className="border border-gray-300 p-2">Availability</th>
                    <th className="border border-gray-300 p-2">Date Added</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id}>
                      <td className="border border-gray-300 p-2 text-center">
                        <img
                          src={car.imageURL}
                          alt={car.carModel}
                          className="w-16 h-16 object-cover mx-auto"
                        />
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {car.carModel}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {car.dailyRentalPrice}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {car.availability}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {car.dateAdded}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <button
                          onClick={() => handleEdit(car)}
                          className="btn btn-primary mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(car._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {modalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold">Update Car Details</h3>
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  className="input input-bordered w-full mt-4"
                  placeholder="Car Model"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                />
                <input
                  type="number"
                  className="input input-bordered w-full mt-4"
                  placeholder="Daily Rental Price"
                  value={dailyRentalPrice}
                  onChange={(e) => setDailyRentalPrice(e.target.value)}
                />
                <select
                  className="select select-bordered w-full mt-4"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
                <textarea
                  className="textarea textarea-bordered w-full mt-4"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit" className="btn btn-primary w-full mt-4">
                  Save Changes
                </button>
              </form>
              <button
                className="btn btn-secondary w-full mt-4"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCars;
