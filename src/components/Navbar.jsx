import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-accent font-bold"
        >
          Home
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/available-cars")}
          className="text-gray-600 hover:text-accent font-bold"
        >
          Available Cars
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/login")}
          className="text-gray-600 hover:text-accent font-bold"
        >
          Login
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/register")}
          className="text-gray-600 hover:text-accent font-bold"
        >
          Register
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/add-car")}
          className="text-gray-600 hover:text-accent font-bold"
        >
          Add Car
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/my-cars")}
          className="text-gray-600 hover:text-accent font-bold"
        >
          My Cars
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/my-bookings")}
          className="text-gray-600 hover:text-accent font-bold"
        >
          My Bookings
        </button>
      </li>
    </>
  );

  return (
    <div className="bg-slate-200 sticky top-0 backdrop-blur-lg z-10">
      <div className="navbar w-11/12 mx-auto flex justify-between">
        {/* Navbar Start */}
        <div className="navbar-start w-full md:w-1/4">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost px-0 md:px-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div>
            <img
              className="w-12 h-12 rounded-full cursor-pointer"
              src={""} // Replace with your logo image
              alt="Logo"
              onClick={() => navigate("/")}
            />
          </div>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-0">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end w-full flex justify-end items-center gap-4">
          {/* Placeholder for user avatar and log-out logic */}
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-accent">Accent</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
