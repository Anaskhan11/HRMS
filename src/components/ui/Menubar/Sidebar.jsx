// libs
import { useSidebarContext } from "../../../context/SidebarContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import IsScrollable from "../common/Scrollable";

// Icons
import { RxDashboard } from "react-icons/rx";
import { GrUserWorker } from "react-icons/gr";
import { TbReportAnalytics } from "react-icons/tb";
import { TbNotebook } from "react-icons/tb";
import { GoProjectSymlink } from "react-icons/go";
import { LuSettings } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";
import { TbListDetails } from "react-icons/tb";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineChevronRight } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import { BsPersonWorkspace } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const Sidebar = () => {
  const [showEmployees, setShowEmployees] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false);
  const [showPositions, setShowPositions] = useState(false);
  const { dispatch } = useSidebarContext();

  return (
    <>
      <div className="sidebar fixed sm:static top-0 left-0 z-10">
        <IsScrollable>
          <div
            className="my-2 flex items-center gap-2 ml-auto p-2 bg-slate-800 w-fit rounded-md mx-2 cursor-pointer"
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          >
            <span>Close</span>
            <RxCross2 className="w-6 h-6 text-white" />
          </div>
          <ul className="my-12">
            <div>
              <RxDashboard className="w-6 h-6" />
              <Link to="/">Dashboard</Link>
            </div>
            <div onClick={() => setShowEmployees(!showEmployees)}>
              <GrUserWorker className="w-6 h-6" />
              <span className="flex items-center">
                Employees{" "}
                {!showEmployees ? (
                  <MdOutlineChevronRight className="w-6 h-6" />
                ) : (
                  <IoChevronDownOutline className="w-6 h-6" />
                )}
              </span>
            </div>
            {showEmployees && (
              <ul className="p-2 bg-violet-400">
                <div>
                  <CiViewList className="w-6 h-6" />
                  <Link to="/employee">Employee List</Link>
                </div>
                <div>
                  <TbListDetails className="w-6 h-6" />
                  <Link to="/employee/details">Employee Details</Link>
                </div>
                <div>
                  <IoPersonAddOutline className="w-6 h-6" />
                  <Link to="/employee/add">Add Employee</Link>
                </div>
              </ul>
            )}
            <div onClick={() => setShowDepartments(!showDepartments)}>
              <BsBuildings className="w-6 h-6" />
              <span className="flex items-center">
                Departments{" "}
                {!showDepartments ? (
                  <MdOutlineChevronRight className="w-6 h-6" />
                ) : (
                  <IoChevronDownOutline className="w-6 h-6" />
                )}
              </span>
            </div>
            {showDepartments && (
              <ul className="p-2 bg-violet-400">
                <div>
                  <CiViewList className="w-6 h-6" />
                  <Link to="/department">Departments List</Link>
                </div>
                <div>
                  <BsBuildings className="w-6 h-6" />
                  <Link to="/department/add">Add Department</Link>
                </div>
              </ul>
            )}
            <div onClick={() => setShowPositions(!showPositions)}>
              <BsPersonWorkspace className="w-6 h-6" />
              <span className="flex items-center">
                Positions{" "}
                {!showPositions ? (
                  <MdOutlineChevronRight className="w-6 h-6" />
                ) : (
                  <IoChevronDownOutline className="w-6 h-6" />
                )}
              </span>
            </div>
            {showPositions && (
              <ul className="p-2 bg-violet-400">
                <div>
                  <CiViewList className="w-6 h-6" />
                  <Link to="/position">Position List</Link>
                </div>
                <div>
                  <BsBuildings className="w-6 h-6" />
                  <Link to="/position/add">Add Position</Link>
                </div>
              </ul>
            )}
            <div>
              <TbReportAnalytics className="w-6 h-6" />
              <li>Reports</li>
            </div>
            <div>
              <TbNotebook className="w-6 h-6" />
              <li>Attendance</li>
            </div>
            <div>
              <GoProjectSymlink className="w-6 h-6" />
              <li>Projects</li>
            </div>
            <div>
              <LuSettings className="w-6 h-6" />
              <li>Settings</li>
            </div>
          </ul>
        </IsScrollable>
      </div>
    </>
  );
};

export default Sidebar;
