import secureLocalStorage from "react-secure-storage";
import axios from "axios";

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BASE_URL}/api/auth/refresh`,
      {
        refreshToken: secureLocalStorage.getItem("refreshToken"),
      },
      {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem("refreshToken")}`,
        },
      }
    );

    const { accessToken } = response.data;
    console.log("Access Token and Refresh Token Set Successfully.");
    secureLocalStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    // Handle token refresh errors, e.g., by redirecting to login
    secureLocalStorage.removeItem("accessToken");
    secureLocalStorage.removeItem("refreshToken");
    windw.location.href = "/login";
    return null;
  }
};
