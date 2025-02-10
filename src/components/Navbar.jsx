import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../assets/driveease.jpeg";
import useAuth from "../hooks/useAuth";
import {
  FaHome,
  FaCar,
  FaSignInAlt,
  FaPlusCircle,
  FaCarAlt,
  FaClipboardList,
} from "react-icons/fa";
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
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 font-bold ${
              isActive ? "text-accent" : "text-gray-600 hover:text-accent"
            }`
          }
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/available-cars"
          className={({ isActive }) =>
            `flex items-center gap-2 font-bold ${
              isActive ? "text-accent" : "text-gray-600 hover:text-accent"
            }`
          }
        >
          <FaCar /> Available Cars
        </NavLink>
      </li>
      {!user && (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `flex items-center gap-2 font-bold ${
                  isActive ? "text-accent" : "text-gray-600 hover:text-accent"
                }`
              }
            >
              <FaSignInAlt /> Login
            </NavLink>
          </li>
        </>
      )}
      {user && (
        <>
          <li>
            <NavLink
              to="/add-car"
              className={({ isActive }) =>
                `flex items-center gap-2 font-bold ${
                  isActive ? "text-accent" : "text-gray-600 hover:text-accent"
                }`
              }
            >
              <FaPlusCircle /> Add Car
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-cars"
              className={({ isActive }) =>
                `flex items-center gap-2 font-bold ${
                  isActive ? "text-accent" : "text-gray-600 hover:text-accent"
                }`
              }
            >
              <FaCarAlt /> My Cars
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                `flex items-center gap-2 font-bold ${
                  isActive ? "text-accent" : "text-gray-600 hover:text-accent"
                }`
              }
            >
              <FaClipboardList /> My Bookings
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-slate-200 sticky top-0 backdrop-blur-lg z-50">
      <div className="navbar  max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between">
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box w-32 p-2 shadow flex flex-col gap-2"
              >
                <p className="font-bold text-[12px] mb-2 text-purple-800 mx-auto">
                  {user?.displayName}
                </p>
                <li>
                  <button
                    onClick={handleLogout}
                    className="font-bold mx-auto hover:text-accent text-white bg-purple-500"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              {/* <button
                onClick={() => navigate("/login")}
                className="btn btn-secondary"
              >
                Login
              </button> */}
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
