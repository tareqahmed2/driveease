import React from "react";

// Example car data
const cars = [
  {
    id: 1,
    model: "Toyota Camry 2023",
    price: "$45/day",
    availability: "Available",
    datePosted: "Added 2 days ago",
    image: "https://i.ibb.co.com/SJhktQN/rockstar.jpg",
  },
  {
    id: 2,
    model: "Honda Civic 2022",
    price: "$35/day",
    availability: "Available",
    datePosted: "Added 5 days ago",
    image: "https://i.ibb.co.com/SJhktQN/rockstar.jpg",
  },
  {
    id: 3,
    model: "Ford Mustang 2021",
    price: "$60/day",
    availability: "Available",
    datePosted: "Added 1 week ago",
    image: "https://i.ibb.co.com/SJhktQN/rockstar.jpg",
  },
  {
    id: 4,
    model: "Chevrolet Malibu 2023",
    price: "$50/day",
    availability: "Available",
    datePosted: "Added 3 days ago",
    image: "https://i.ibb.co.com/SJhktQN/rockstar.jpg",
  },
  {
    id: 5,
    model: "BMW 320i 2022",
    price: "$75/day",
    availability: "Available",
    datePosted: "Added 4 days ago",
    image: "https://i.ibb.co.com/SJhktQN/rockstar.jpg",
  },
  {
    id: 6,
    model: "Audi A4 2023",
    price: "$80/day",
    availability: "Not Available",
    datePosted: "Added 2 weeks ago",
    image: "https://i.ibb.co.com/SJhktQN/rockstar.jpg",
  },
];

const RecentListings = () => {
  return (
    <section className="my-16 px-6 w-11/12 mx-auto">
      <h2 className="text-4xl text-purple-800 font-semibold text-center mb-12">
        Recent Listings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            <img
              src={car.image}
              alt={car.model}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{car.model}</h3>
              <p className="text-gray-600 mb-2">{car.price}</p>
              <p
                className={`text-sm font-medium ${
                  car.availability === "Available"
                    ? "text-green-500"
                    : "text-red-500"
                } mb-2`}
              >
                {car.availability}
              </p>
              <p className="text-gray-500 text-sm">{car.datePosted}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentListings;
