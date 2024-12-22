import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";

import Home from "../pages/Home";
import AvailableCars from "../pages/AvailableCars";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCar from "../pages/AddCar";
import MyCars from "../pages/MyCars";
import MyBookings from "../pages/MyBookings";
import ErrorPage from "../components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/available-cars",
        element: <AvailableCars />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-car",
        element: <AddCar />,
      },
      {
        path: "/my-cars",
        element: <MyCars />,
      },
      {
        path: "/my-bookings",
        element: <MyBookings />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
export default router;
