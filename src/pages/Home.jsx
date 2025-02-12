import React from "react";
import Banner from "../components/Banner";
import WhyChooseUs from "../components/WhyChooseUs";
import RecentListings from "../components/RecentListings";
import UserTestimonials from "../components/UserTestimonials";
import SpecialOffers from "../components/SpecialOffers";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>DriveEase | Home</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <Banner></Banner>
      <WhyChooseUs></WhyChooseUs>
      <RecentListings></RecentListings>
      <UserTestimonials></UserTestimonials>
      <SpecialOffers></SpecialOffers>
    </div>
  );
};

export default Home;
