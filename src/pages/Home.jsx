import React from "react";
import Banner from "../components/Banner";
import WhyChooseUs from "../components/WhyChooseUs";
import RecentListings from "../components/RecentListings";
import UserTestimonials from "../components/UserTestimonials";
import SpecialOffers from "../components/SpecialOffers";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <WhyChooseUs></WhyChooseUs>
      <RecentListings></RecentListings>
      <UserTestimonials></UserTestimonials>
      <SpecialOffers></SpecialOffers>
    </div>
  );
};

export default Home;
