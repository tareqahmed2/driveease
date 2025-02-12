import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../assets/driveease.jpeg";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Hook for managing theme

  return (
    <footer
      className={`py-10 ${
        theme === "light"
          ? "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
          : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto text-center px-6">
        {/* Logo and Website Name */}
        <div className="mb-6">
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="Website Logo"
            className="mx-auto w-16 h-16 mb-3 rounded-full border-2 border-gray-700"
          />
          <h2
            className={`text-2xl font-bold tracking-wider ${
              theme === "light" ? "text-gray-800" : "text-gray-100"
            }`}
          >
            DriveEase
          </h2>
        </div>

        {/* Divider */}
        <div
          className={`border-t my-6 ${
            theme === "light" ? "border-gray-400" : "border-gray-700"
          }`}
        ></div>

        {/* Copyright Information */}
        <p
          className={`text-sm mb-6 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">DriveEase</span>. All Rights Reserved.
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            } hover:${
              theme === "light" ? "text-blue-400" : "text-blue-400"
            } transition transform hover:scale-110`}
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            } hover:${
              theme === "light" ? "text-blue-400" : "text-blue-400"
            } transition transform hover:scale-110`}
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            } hover:${
              theme === "light" ? "text-pink-400" : "text-pink-400"
            } transition transform hover:scale-110`}
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            } hover:${
              theme === "light" ? "text-blue-500" : "text-blue-500"
            } transition transform hover:scale-110`}
          >
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
