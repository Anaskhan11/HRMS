// libs
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebarContext } from "../../../context/SidebarContext";
import secureLocalStorage from "react-secure-storage";

// Logo Icon
import { RxCodesandboxLogo } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { RiMenu3Line } from "react-icons/ri";

const Topbar = () => {
  const { state, dispatch } = useSidebarContext();
  const [user, setUser] = useState(secureLocalStorage.getItem("user"));

  useEffect(() => {
    console.log("Topbar User:", secureLocalStorage.getItem("user"));
    setUser(secureLocalStorage.getItem("user"));
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    // remove the access token from secureLocalStorage
    secureLocalStorage.removeItem("accessToken");
    secureLocalStorage.removeItem("refreshToken");
    secureLocalStorage.removeItem("user");

    navigate("/login");
  };
  return (
    <div className="topbar">
      <h3 className="text-2xl font-bold text-center my-4 flex items-center justify-center gap-2">
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

      <div className="flex items-center gap-4 ">
        <span className="hidden sm:flex items-center gap-2 p-2 font-bold rounded-md border border-primary text-primary">
          Hello! 👋 {user?.email} <FaRegUser className="text-primary w-6 h-6" />
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
