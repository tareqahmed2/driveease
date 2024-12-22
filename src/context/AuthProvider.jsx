import React, { createContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "../firebase/firebase.init";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { FaSpinner } from "react-icons/fa";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
        setUserPhoto(null);
        setUserName(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);
  const signInWithGoogle = async (navigate) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;

        setUser(user);

        setLoading(false);

        toast.success("Login Successfully");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        toast.error(errorMessage);
      });
  };

  const signUp = async (email, password, name, photo, navigate) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential.user);
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
        return;
      });
  };
  const signInUser = async (email, password, navigate) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      if (result.user) {
        navigate("/");
      }
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Failed to log in!");
      return;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      toast.error("Failed to log out!");

      return;
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
    signInUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
