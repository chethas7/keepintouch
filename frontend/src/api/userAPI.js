import axiosInstance from "./axiosInstance";

// UPDATE PROFILE
export const updateProfileAPI = (data) =>
  axiosInstance.put("/user/update-profile", data);
