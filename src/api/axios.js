import axios from "axios";
import { refreshToken } from "./auth";
import secureLocalStorage from "react-secure-storage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = secureLocalStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Check if error.response exists before attempting to read error.response.status
    if (error.response) {
      const originalRequest = error.config;

      // Assuming the error is due to an expired token and needs a refresh
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const accessToken = await refreshToken(); // Your refresh logic to get a new token
          console.log("Access Token Refreshed.", accessToken);
          if (accessToken) {
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + accessToken;
            originalRequest.headers["Authorization"] = "Bearer " + accessToken;
            return axios(originalRequest); // Retry the original request with the new token
          }
        } catch (refreshError) {
          // Handle failed refresh token here (e.g., redirect to login)
          return Promise.reject(refreshError);
        }
      }
    }

    // For errors without a response (e.g., network error), handle them here
    return Promise.reject(error);
  }
);
export default axiosInstance;
