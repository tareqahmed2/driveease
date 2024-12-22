import React from "react";
import { useDropzone } from "react-dropzone";

const AddCar = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log("Uploaded files:", acceptedFiles);
    },
  });

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-8">Add New Car</h2>
        <form className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Car Model</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter car model"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Daily Rental Price</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Enter price per day"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Availability</span>
            </label>
            <select className="select select-bordered w-full" required>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Vehicle Registration Number</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter registration number"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Features</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g., GPS, AC, Sunroof"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter a detailed description"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter location"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Car Images</span>
            </label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <p className="text-gray-500">
                Drag & drop some files here, or click to select files
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button type="button" className="btn btn-primary w-full sm:w-1/2">
              Save Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
