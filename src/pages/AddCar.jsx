import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTheme } from "next-themes";

const AddCar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // const [uploadedFiles, setUploadedFiles] = useState([]);

  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: "image/*",
  //   onDrop: (acceptedFiles) => {
  //     console.log("Uploaded files:", acceptedFiles);
  //   },
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (uploadedFiles.length === 0) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "No Image Uploaded",
    //     text: "Please upload at least one image.",
    //   });
    //   return;
    // }
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    // uploadedFiles.forEach((file, index) => {
    //   formData.append(`image_${index}`, file);
    // });
    const options = {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    const formatter = new Intl.DateTimeFormat("en-GB", options);

    const currentTimeInDhaka = formatter.format(new Date());

    const carData = {
      ...initialData,
      bookingCount: 0,
      bookingStatus: "Pending",
      addedBy: user.email,
      dateAdded: currentTimeInDhaka,
    };

    try {
      const response = await axios.post(
        "https://assignment11-server-side-mu.vercel.app/all-cars",
        carData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Car added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding car:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add car",
        text: "Something went wrong. Please try again.",
      });
    }
  };
  const { theme } = useTheme();

  return (
    // <div className="min-h-screen bg-base-200 py-10 px-4">
    //   <Helmet>
    //     <title>DriveEase | Add Car</title>
    //     <link rel="canonical" href="https://www.tacobell.com/" />
    //   </Helmet>
    //   <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
    //     <h2 className="text-3xl font-semibold text-center mb-8">Add New Car</h2>
    //     <form onSubmit={handleSubmit} className="space-y-6">
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Car Model</span>
    //         </label>
    //         <input
    //           name="carModel"
    //           type="text"
    //           className="input input-bordered w-full"
    //           placeholder="Enter car model"
    //           required
    //         />
    //       </div>

    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Daily Rental Price</span>
    //         </label>
    //         <input
    //           name="dailyRentalPrice"
    //           type="number"
    //           className="input input-bordered w-full"
    //           placeholder="Enter price per day"
    //           required
    //         />
    //       </div>

    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Availability</span>
    //         </label>
    //         <select
    //           name="availability"
    //           className="select select-bordered w-full"
    //           required
    //         >
    //           <option value="Available">Available</option>
    //           <option value="Not Available">Not Available</option>
    //         </select>
    //       </div>

    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Vehicle Registration Number</span>
    //         </label>
    //         <input
    //           name="vehicleRegistrationNumber"
    //           type="text"
    //           className="input input-bordered w-full"
    //           placeholder="Enter registration number"
    //           required
    //         />
    //       </div>

    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Features</span>
    //         </label>
    //         <input
    //           name="features"
    //           type="text"
    //           className="input input-bordered w-full"
    //           placeholder="e.g., GPS, AC, Sunroof"
    //           required
    //         />
    //       </div>

    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Description</span>
    //         </label>
    //         <textarea
    //           name="description"
    //           className="textarea textarea-bordered w-full"
    //           placeholder="Enter a detailed description"
    //           required
    //         ></textarea>
    //       </div>

    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Location</span>
    //         </label>
    //         <input
    //           name="location"
    //           type="text"
    //           className="input input-bordered w-full"
    //           placeholder="Enter location"
    //           required
    //         />
    //       </div>

    //       {/* <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Car Images</span>
    //         </label>
    //         <div
    //           {...getRootProps()}
    //           className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer"
    //         >
    //           <input {...getInputProps()} />
    //           <p className="text-gray-500">
    //             Drag & drop some files here, or click to select files
    //           </p>
    //         </div>
    //       </div> */}
    //       <div className="form-control">
    //         <label className="label">
    //           <span className="label-text">Car Images</span>
    //         </label>
    //         <input
    //           name="imageURL"
    //           type="url"
    //           className="input input-bordered w-full"
    //           placeholder="Enter image url"
    //           required
    //         />
    //       </div>
    //       <div className="flex justify-center">
    //         <button type="submit" className="btn btn-primary w-full sm:w-1/2">
    //           Save Car
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <Helmet>
        <title>DriveEase | Add Car</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div
        className={`max-w-4xl mx-auto shadow-xl rounded-lg p-8 ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        }`}
      >
        <h2
          className={`text-3xl font-semibold text-center mb-8 ${
            theme === "light" ? "text-gray-800" : "text-gray-100"
          }`}
        >
          Add New Car
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label
              className={`label ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              <span className="label-text">Car Model</span>
            </label>
            <input
              name="carModel"
              type="text"
              className={`input input-bordered w-full ${
                theme === "light"
                  ? "bg-white text-gray-800"
                  : "bg-gray-800 text-gray-200"
              }`}
              placeholder="Enter car model"
              required
            />
          </div>

          <div className="form-control">
            <label
              className={`label ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              <span className="label-text">Daily Rental Price</span>
            </label>
            <input
              name="dailyRentalPrice"
              type="number"
              className={`input input-bordered w-full ${
                theme === "light"
                  ? "bg-white text-gray-800"
                  : "bg-gray-800 text-gray-200"
              }`}
              placeholder="Enter price per day"
              required
            />
          </div>

          <div className="form-control">
            <label
              className={`label ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              <span className="label-text">Availability</span>
            </label>
            <select
              name="availability"
              className={`select select-bordered w-full ${
                theme === "light"
                  ? "bg-white text-gray-800"
                  : "bg-gray-800 text-gray-200"
              }`}
              required
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          <div className="form-control">
            <label
              className={`label ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              <span className="label-text">Vehicle Registration Number</span>
            </label>
            <input
              name="vehicleRegistrationNumber"
              type="text"
              className={`input input-bordered w-full ${
                theme === "light"
                  ? "bg-white text-gray-800"
                  : "bg-gray-800 text-gray-200"
              }`}
              placeholder="Enter registration number"
              required
            />
          </div>

          <div className="form-control">
            <label
              className={`label ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              <span className="label-text">Features</span>
            </label>
            <input
              name="features"
              type="text"
              className={`input input-bordered w-full ${
                theme === "light"
                  ? "bg-white text-gray-800"
                  : "bg-gray-800 text-gray-200"
              }`}
              placeholder="e.g., GPS, AC, Sunroof"
              required
            />
          </div>

          <div className="form-control">
            <label
              className={`label ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              className={`textarea textarea-bordered w-full ${
                theme === "light"
                  ? "bg-white text-gray-800"
                  : "bg-gray-800 text-gray-200"
              }`}
              placeholder="Enter a detailed description"
              required
            ></textarea>
          </div>

          <div className="form-control">
            <label
              className={`label ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              <span className="label-text">Location</span>
            </label>
            <input
              name="location"
              type="text"
              className={`input input-bordered w-full ${
                theme === "light"
                  ? "bg-white text-gray-800"
                  : "bg-gray-800 text-gray-200"
              }`}
              placeholder="Enter location"
              required
            />
          </div>

          <div className="form-control">
            <label
              className={`label ${
                theme === "light" ? "text-gray-800" : "text-gray-200"
              }`}
            >
              <span className="label-text">Car Images</span>
            </label>
            <input
              name="imageURL"
              type="url"
              className={`input input-bordered w-full ${
                theme === "light"
                  ? "bg-white text-gray-800"
                  : "bg-gray-800 text-gray-200"
              }`}
              placeholder="Enter image URL"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`btn w-full sm:w-1/2 ${
                theme === "light" ? "btn-primary" : "btn-secondary"
              }`}
            >
              Save Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
