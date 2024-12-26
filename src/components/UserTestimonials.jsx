import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.postimg.cc/5yjH8ydX/jhon.jpg",
    rating: 5,
    review: "Amazing service and great cars. Highly recommend!",
    background: "bg-purple-200",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://i.postimg.cc/FsddRYVq/smith.jpg",
    rating: 4,
    review: "Had a great experience renting a car. Will definitely use again!",
    background: "bg-pink-200",
  },
  {
    id: 3,
    name: "David Brown",
    image: "https://i.postimg.cc/s2c1873B/daniel.jpg",
    rating: 5,
    review: "The booking process was smooth, and the car was fantastic!",
    background: "bg-teal-200",
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
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const fadeInOut = useSpring({
    loop: { reverse: true },
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 2000 },
  });

  return (
    <section className="w-11/12 mx-auto my-16 px-6 py-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <h2 className="text-4xl font-semibold text-center mb-12 text-white">
        What Our Customers Say
      </h2>

      <Slider {...settings} className="px-4">
        {testimonials.map((testimonial, index) => (
          <animated.div
            key={testimonial.id}
            style={fadeInOut}
            className={`flex flex-col items-center text-center p-8 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 ease-in-out ${testimonial.background}`}
          >
            <animated.img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-28 h-28 mx-auto rounded-full mb-6 shadow-lg"
              style={fadeInOut}
            />
            <h3 className="text-2xl font-bold mb-3 text-gray-800 hover:text-indigo-500 cursor-pointer transition-colors duration-300">
              {testimonial.name}
            </h3>
            <div className="flex mb-3 justify-center">
              {[...Array(testimonial.rating)].map((_, idx) => (
                <FaStar key={idx} className="text-yellow-400 text-lg" />
              ))}
            </div>
            <p className="text-lg text-gray-700 italic">{testimonial.review}</p>
          </animated.div>
        ))}
      </Slider>
    </section>
  );
};

export default UserTestimonials;
