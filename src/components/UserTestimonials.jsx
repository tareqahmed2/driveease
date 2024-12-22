import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Example car data

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.ibb.co.com/SJhktQN/rockstar.jpg",
    rating: 5,
    review: "Amazing service and great cars. Highly recommend!",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://i.ibb.co.com/SJhktQN/rockstar.jpg",
    rating: 4,
    review: "Had a great experience renting a car. Will definitely use again!",
  },
  {
    id: 3,
    name: "David Brown",
    image: "https://i.ibb.co.com/SJhktQN/rockstar.jpg",
    rating: 5,
    review: "The booking process was smooth, and the car was fantastic!",
  },
];

const UserTestimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <section className="w-11/12 mx-auto my-16 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-12">
      <h2 className="text-4xl font-semibold text-center  mb-12 text-white">
        What Our Customers Say
      </h2>

      <Slider {...settings} className="px-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-28 h-28 mx-auto rounded-full mb-6 shadow-lg"
            />
            <h3 className="text-2xl font-bold mb-3 text-gray-800">
              {testimonial.name}
            </h3>
            <div className="flex mb-3 justify-center">
              {[...Array(testimonial.rating)].map((_, index) => (
                <FaStar key={index} className="text-yellow-400 text-lg" />
              ))}
            </div>
            <p className="text-lg text-gray-700 italic">{testimonial.review}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default UserTestimonials;
