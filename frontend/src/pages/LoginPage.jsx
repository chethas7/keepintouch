import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
  FaVenusMars,
} from "react-icons/fa";

import {
  register,
  login,
  verifyOtp,
  googleLogin,
  reset,
} from "../redux/slices/authSlice";

import { assets } from "../assets/assets";

const LoginPage = () => {
  const [formState, setFormState] = useState("Login");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
    otp: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (user) navigate("/home");

    if (isError) toast.error(message);

    if (isSuccess) {
      if (formState === "SignUp" && message.includes("OTP")) {
        setFormState("VerifyOTP");
      } else if (formState === "VerifyOTP") {
        setFormState("Login");
      }

      toast.success(message);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, formState, navigate, dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (formState === "SignUp") {
      if (formData.password !== formData.confirmPassword) {
        return toast.error("Passwords do not match");
      }

      dispatch(
        register({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
        }),
      );
    } else if (formState === "Login") {
      dispatch(
        login({
          email: formData.email,
          password: formData.password,
        }),
      );
    } else if (formState === "VerifyOTP") {
      dispatch(
        verifyOtp({
          email: formData.email,
          otp: formData.otp,
        }),
      );
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    dispatch(googleLogin(credentialResponse.credential));
  };

  const handleGoogleFailure = () => {
    toast.error("Google login failed");
  };

  const formVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 },
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* LEFT SECTION */}

      <div className="relative flex flex-col justify-center items-center p-8 bg-white text-gray-800 md:w-[60%] lg:w-[60%]">
        <div className="text-center max-w-xl mx-auto">
          <img
            src={assets.homelogo}
            alt="KeepInTouch"
            className="w-96 h-96 object-cover rounded-full mb-6 mx-auto"
          />

          <p className="text-lg md:text-xl leading-relaxed font-normal text-gray-600">
            Distance means nothing when you can keepintouch. Stay connected with
            friends, family, and everything in between.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}

      <div className="flex-1 flex justify-center items-center p-8 bg-white">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg flex flex-col items-center border border-gray-200"
        >
          <h1 className="text-center text-3xl text-neutral-800 font-bold mb-4">
            {formState === "Login" && "Login"}
            {formState === "SignUp" && "Sign Up"}
            {formState === "VerifyOTP" && "Verify Email"}
          </h1>

          <p className="text-sm text-gray-600 mb-6 text-center">
            {formState === "Login" && "Welcome Back! Please Login to Continue"}
            {formState === "SignUp" && "Join us! Create your account"}
            {formState === "VerifyOTP" && "Enter the OTP sent to your email"}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={formState}
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {/* SIGNUP EXTRA FIELDS */}

              {formState === "SignUp" && (
                <>
                  <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                    <FaUser />
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="outline-none flex-1"
                      placeholder="Full Name"
                      required
                    />
                  </div>

                  <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                    <FaVenusMars />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="outline-none flex-1 bg-transparent"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                    <FaCalendarAlt />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="outline-none flex-1"
                      required
                    />
                  </div>
                </>
              )}

              {/* EMAIL */}

              {(formState === "Login" || formState === "SignUp") && (
                <>
                  <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                    <FaEnvelope />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="outline-none flex-1"
                      required
                    />
                  </div>

                  <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                    <FaLock />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      className="outline-none flex-1"
                      required
                    />
                  </div>
                </>
              )}

              {/* CONFIRM PASSWORD */}

              {formState === "SignUp" && (
                <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                  <FaLock />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="outline-none flex-1"
                    required
                  />
                </div>
              )}

              {/* OTP */}

              {formState === "VerifyOTP" && (
                <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                  <FaLock />
                  <input
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    className="outline-none flex-1"
                    required
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 w-full text-white py-3 rounded-full mt-6 font-semibold"
          >
            {formState === "Login" ? "Login" : "Continue"}
          </button>

          {/* GOOGLE LOGIN */}

          <div className="mt-4 w-full flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              width="100%"
            />
          </div>

          {/* SWITCH LOGIN/SIGNUP */}

          {formState === "Login" ? (
            <p className="mt-5 text-sm">
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setFormState("SignUp")}
              >
                Register
              </span>
            </p>
          ) : (
            <p className="mt-5 text-sm">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setFormState("Login")}
              >
                Login
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
