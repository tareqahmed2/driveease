import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/driveease.jpeg";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

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
      {user && (
        <>
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
      )}
    </>
  );

  return (
    <div className="bg-slate-200 sticky top-0 backdrop-blur-lg z-10">
      <div className="navbar w-11/12 mx-auto flex flex-wrap items-center justify-between">
        {/* Navbar Start */}
        <div className="navbar-start w-auto lg:w-1/4 flex items-center gap-3">
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
          <img
            className="w-10 h-10 rounded-full cursor-pointer"
            src={logo}
            alt="Logo"
            onClick={() => navigate("/")}
          />
          <h2 className="text-2xl font-bold text-purple-700 hidden md:block">
            DriveEase
          </h2>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex w-auto lg:w-auto justify-center">
          <ul className="menu menu-horizontal px-0">{links}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end w-auto flex items-center gap-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar flex items-center"
              >
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL} alt="User Avatar" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box w-52 p-2 shadow flex flex-col gap-2"
              >
                <p className="font-bold text-[12px] mb-2 text-purple-800">
                  {user?.displayName}
                </p>
                <li>
                  <button
                    onClick={handleLogout}
                    className="font-bold hover:text-accent text-white bg-purple-500"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="btn btn-secondary"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-primary"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
