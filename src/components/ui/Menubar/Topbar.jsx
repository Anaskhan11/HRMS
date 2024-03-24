// Libs
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebarContext } from "../../../context/SidebarContext";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import secureLocalStorage from "react-secure-storage";

// Icons
import { RxCodesandboxLogo } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdSunny, IoMdMoon } from "react-icons/io";

const Topbar = () => {
  const { toggleTheme } = useTheme();
  const { state, dispatch } = useSidebarContext();
  const [user, setUser] = useState(secureLocalStorage.getItem("user"));
  const [isDarkMode, setIsDarkMode] = useState(false); // Default theme state

  useEffect(() => {
    console.log("Topbar User:", secureLocalStorage.getItem("user"));
    setUser(secureLocalStorage.getItem("user"));
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    secureLocalStorage.removeItem("accessToken");
    secureLocalStorage.removeItem("refreshToken");
    secureLocalStorage.removeItem("user");

    navigate("/login");
  };

  const toggleWebsiteTheme = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme();
    // Here you would also switch CSS or class names for real theme implementation
  };

  return (
    <div className="topbar flex justify-between items-center">
      <div>
        <h3 className="text-2xl font-bold text-center my-4 flex items-center gap-2">
          {!state.sidebar && (
            <span
              className="p-2 rounded-full bg-primary cursor-pointer mr-4"
              onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
            >
              <RiMenu3Line className="text-white w-8 h-8" />
            </span>
          )}
          <RxCodesandboxLogo className="w-8 h-8 text-primary" />
          <span className="text-primary">HRMS</span>
        </h3>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <motion.div
          className={`flex items-center justify-between w-12 h-6 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-300"
          } rounded-full p-1 cursor-pointer`}
          onClick={toggleWebsiteTheme}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="w-4 h-4 bg-white rounded-full"
            layout
            transition={{ type: "spring", stiffness: 700, damping: 30 }}
            animate={{ x: isDarkMode ? 24 : 0 }}
          >
            {isDarkMode ? (
              <IoMdMoon className="text-yellow-500" />
            ) : (
              <IoMdSunny className="text-yellow-500" />
            )}
          </motion.div>
        </motion.div>

        {/* Rest of the topbar */}
        <span className="hidden sm:flex items-center gap-2 p-1 font-bold rounded-md border border-primary text-primary">
          Hello! 👋 {user?.email}{" "}
          {user && user.image ? (
            <img
              src={`${import.meta.env.VITE_APP_BASE_URL}/${user.image}`}
              alt="user profile image"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <FaRegUser className="text-primary w-6 h-6" />
          )}
        </span>
        <span
          className="px-4 py-2 rounded-md bg-black text-white font-semibold cursor-pointer hover:shadow hover:shadow-lg"
          onClick={handleLogout}
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default Topbar;
