import React, { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signInUser, signInWithGoogle } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");

    signInUser(email, password, navigate)
      .then((result) => {
        console.log("sign in", result.user);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Sign in error:", error);
        setError("Failed to sign in. Please try again.");
      });
  };

  // Demo login function
  const handleDemoLogin = () => {
    const demoEmail = "tareqahmed347396@gmail.com";
    const demoPassword = "tareq123";

    signInUser(demoEmail, demoPassword, navigate)
      .then((result) => {
        console.log("Demo sign in", result.user);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Demo sign in error:", error);
        setError("Failed to sign in. Please try again.");
      });
  };

  return (
    <div className="px-6 flex justify-center items-center my-10 mx-5">
      <Helmet>
        <title>DriveEase | Login</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="card bg-base-100 w-full md:w-3/4 lg:w-3/6 px-2 shrink-0 shadow-2xl max-w-7xl">
        <h2 className="text-2xl my-10 font-bold text-center mb-6 text-[#FF00D3]">
          Login Now!
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
              name="email"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input w-full input-bordered pr-10"
                required
                name="password"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-control mt-6">
            {/* Demo Login Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn btn-accent border-none bg-[#FF00D3] mb-5"
            >
              Demo Login
            </button>
            <button className="btn btn-accent border-none bg-[#FF00D3]">
              Login
            </button>
          </div>

          <button
            onClick={() => signInWithGoogle(navigate)}
            className="btn flex items-center"
          >
            <span>
              <FaGoogle />
            </span>
            Login With Google
          </button>
        </form>

        <div className="flex justify-center items-center">
          <p className="my-5 font-bold">
            Don't have an account?{" "}
            <Link className="text-red-500" to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
