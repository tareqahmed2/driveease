import React, { useState } from "react";

const initialCars = [
  {
    id: 1,
    image: "https://via.placeholder.com/100",
    model: "Toyota Corolla",
    price: "$50/day",
    availability: "Available",
    dateAdded: "December 1, 2024",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/100",
    model: "Honda Civic",
    price: "$45/day",
    availability: "Not Available",
    dateAdded: "November 25, 2024",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/100",
    model: "Ford Mustang",
    price: "$120/day",
    availability: "Available",
    dateAdded: "December 5, 2024",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/100",
    model: "Tesla Model 3",
    price: "$100/day",
    availability: "Available",
    dateAdded: "November 20, 2024",
  },
];

const MyCars = () => {
  const [cars, setCars] = useState(initialCars);
  const [sortOrder, setSortOrder] = useState("dateDesc");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const sortCars = (order) => {
    const sortedCars = [...cars].sort((a, b) => {
      if (order === "dateDesc") {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      } else if (order === "dateAsc") {
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      } else if (order === "priceAsc") {
        return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
      } else if (order === "priceDesc") {
        return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
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
    setModalOpen(true);
  };

  const handleDelete = (carId) => {
    setDeleteModalOpen(true);
    setCurrentCar(carId);
  };

  const confirmDelete = () => {
    setCars(cars.filter((car) => car.id !== currentCar));
    setDeleteModalOpen(false);
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
                          src={car.image}
                          alt={car.model}
                          className="w-16 h-16 object-cover mx-auto"
                        />
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {car.model}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {car.price}
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
                          onClick={() => handleDelete(car.id)}
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
              <form>
                <input
                  type="text"
                  value={currentCar?.model || ""}
                  className="input input-bordered w-full mt-4"
                  placeholder="Car Model"
                />
                <input
                  type="number"
                  value={currentCar?.price || ""}
                  className="input input-bordered w-full mt-4"
                  placeholder="Daily Rental Price"
                />
                <select
                  value={currentCar?.availability || ""}
                  className="select select-bordered w-full mt-4"
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>
                <textarea
                  value={currentCar?.description || ""}
                  className="textarea textarea-bordered w-full mt-4"
                  placeholder="Description"
                />
                <button
                  type="submit"
                  className="btn btn-primary w-full mt-4"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
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

        {deleteModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold">Are you sure?</h3>
              <p className="mt-4">
                Do you want to delete this car? This action cannot be undone.
              </p>
              <div className="mt-4 flex justify-between">
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Yes, Delete
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCars;
