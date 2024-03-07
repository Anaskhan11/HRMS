// Logo Icon
import { RxCodesandboxLogo } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { RiMenu3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSidebarContext } from "../../../context/SidebarContext";
import secureLocalStorage from "react-secure-storage";

const Topbar = () => {
  const { state, dispatch } = useSidebarContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove the access token from secureLocalStorage
    secureLocalStorage.removeItem("accessToken");
    secureLocalStorage.removeItem("refreshToken");
    navigate("/login");
  };
  return (
    <div className="topbar">
      <h3 className="text-2xl font-bold text-center my-4 flex items-center justify-center gap-2">
        {!state.sidebar && (
          <span
            className="p-2 rounded-full bg-[#7054f6] cursor-pointer mr-4"
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          >
            <RiMenu3Line className="text-white w-8 h-8" />
          </span>
        )}
        <RxCodesandboxLogo className="w-8 h-8 text-[#7054f6]" />
        <span className="text-[#7054f6]">HRMS</span>
      </h3>

      <div className="flex items-center gap-4 ">
        <span className="hidden sm:flex items-center gap-2 p-2 font-bold rounded-md border border-[#7054f6] text-[#7054f6]">
          Hello! 👋 huzaifawaqar77@gmail.com{" "}
          <FaRegUser className="text-[#7054f6] w-6 h-6" />
        </span>
        <span
          className="px-4 py-2 rounded-md bg-[#7054f6] text-white font-semibold cursor-pointer hover:shadow hover:shadow-lg"
          onClick={handleLogout}
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default Topbar;
