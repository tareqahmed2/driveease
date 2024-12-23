import React from "react";
import useAuth from "../hooks/useAuth";

const MyBookings = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2> this is my booking</h2>
    </div>
  );
};

export default MyBookings;
