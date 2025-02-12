import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "next-themes";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    image: "https://i.postimg.cc/5yjH8ydX/jhon.jpg",
    rating: 5,
    review: "Amazing service and great cars. Highly recommend!",
    backgroundLight: "bg-purple-200",
    backgroundDark: "bg-purple-700",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "https://i.postimg.cc/FsddRYVq/smith.jpg",
    rating: 4,
    review: "Had a great experience renting a car. Will definitely use again!",
    backgroundLight: "bg-pink-200",
    backgroundDark: "bg-pink-700",
  },
  {
    id: 3,
    name: "David Brown",
    image: "https://i.postimg.cc/s2c1873B/daniel.jpg",
    rating: 5,
    review: "The booking process was smooth, and the car was fantastic!",
    backgroundLight: "bg-teal-200",
    backgroundDark: "bg-teal-700",
  },
];

const UserTestimonials = () => {
  const { theme } = useTheme();

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
    <section className="max-w-7xl px-6 mx-auto">
      <div
        className={`my-16 border-2 py-12 rounded-lg transition-all duration-300 shadow-md ${
          theme === "light"
            ? "bg-slate-200 border-gray-300"
            : "bg-gray-800 border-gray-600"
        }`}
      >
        <h2 className="text-4xl font-semibold text-center mb-4 text-purple-500">
          What Our Customers Say
        </h2>
        <p
          className={`text-center mb-12 w-4/5 mx-auto transition-colors duration-300 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          Discover the real stories behind our customer satisfaction! In this
          section, we share honest feedback and testimonials from those who have
          experienced our top-notch car rental services. See how we've helped
          them enjoy seamless, reliable, and memorable journeys.
        </p>

        <Slider {...settings} className="px-4">
          {testimonials.map((testimonial) => (
            <animated.div
              key={testimonial.id}
              style={fadeInOut}
              className={`flex flex-col items-center text-center p-8 rounded-lg shadow-xl hover:scale-105 transition-all duration-300 ease-in-out ${
                theme === "light"
                  ? testimonial.backgroundLight
                  : testimonial.backgroundDark
              }`}
            >
              <animated.img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-28 h-28 mx-auto rounded-full mb-6 shadow-lg border-4 border-white"
                style={fadeInOut}
              />
              <h3
                className={`text-2xl font-bold mb-3 hover:text-indigo-500 cursor-pointer transition-colors duration-300 ${
                  theme === "light" ? "text-gray-800" : "text-gray-100"
                }`}
              >
                {testimonial.name}
              </h3>
              <div className="flex mb-3 justify-center">
                {[...Array(testimonial.rating)].map((_, idx) => (
                  <FaStar key={idx} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p
                className={`text-lg italic transition-colors duration-300 ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
              >
                {testimonial.review}
              </p>
            </animated.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default UserTestimonials;
