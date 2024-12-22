import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../assets/driveease.jpeg";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10">
      <div className="container mx-auto text-center">
        {/* Logo and Website Name */}
        <div className="mb-6">
          <img
            src={logo}
            alt="Website Logo"
            className="mx-auto w-16 h-16 mb-3 rounded-full border-2 border-gray-700"
          />
          <h2 className="text-2xl font-bold tracking-wider">DriveEase</h2>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright Information */}
        <p className="text-sm mb-6">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">DriveEase</span>. All Rights Reserved.
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-400 transition transform hover:scale-110"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition transform hover:scale-110"
          >
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
