import React, { createContext, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "../firebase/firebase.init";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { FaSpinner } from "react-icons/fa";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (email, password, name, photo, navigate) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential.user);

        return updateProfile(user, {
          displayName: name,
          photoURL: photo,
          email: email,
        });
      })
      .then(() => {
        setLoading(false);

        logOut();
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during user registration:", error.message);
        toast.error("Registration failed: " + error.message);
        setLoading(false);
        navigate("/register");
      });
  };
  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      toast.error("Failed to log out!");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-3xl" />
      </div>
    );
  }
  const authInfo = {
    signUp,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
