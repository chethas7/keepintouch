import axiosInstance from "./axiosInstance";

export const loginUserAPI = (data) => axiosInstance.post("/auth/login", data);
export const registerAPI = (data) => axiosInstance.post("/auth/send-otp", data);
export const verifyOtpAPI = (data) =>
  axiosInstance.post("/auth/verify-otp", data);
export const googleLoginAPI = (data) =>
  axiosInstance.post("/auth/google-login", { credential: data });
export const forgotPasswordAPI = (data) =>
  axiosInstance.post("/auth/forgot-password", data);

export const resetPasswordAPI = (data) =>
  axiosInstance.post("/auth/reset-password", data);
