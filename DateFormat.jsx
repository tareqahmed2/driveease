import React from "react";

const DateFormat = () => {
  const options = {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    seconds: "2-digit",
    hour12: true,
  };
  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const currentTimeInDhaka = formatter.format(new Date());
  console.log(currentTimeInDhaka);

  return <div>{currentTimeInDhaka}</div>;
};

export default DateFormat;
