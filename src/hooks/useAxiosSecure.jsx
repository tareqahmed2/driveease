import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
const axiosInstance = axios.create({
  baseURL: "https://assignment11-server-side-mu.vercel.app",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("error caought in interceptor", error);
        if (error.status === 401 || error.status === 403) {
          console.log("need to logout the user");
          logOut()
            .then(() => {
              console.log("logout user");
              navigate("?login");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return axiosInstance;
};

export default useAxiosSecure;
