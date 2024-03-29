// Libs
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import IsScrollable from "../common/Scrollable";
import secureLocalStorage from "react-secure-storage";
import MenuBar from "../common/MenuBar";

//Icons
import { RxDashboard } from "react-icons/rx";
import { GrUserWorker } from "react-icons/gr";
import { TbReportAnalytics, TbNotebook, TbListDetails } from "react-icons/tb";
import { GoProjectSymlink } from "react-icons/go";
import { LuSettings } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";
import { IoPersonAddOutline, IoChevronDownOutline } from "react-icons/io5";
import { MdOutlineChevronRight } from "react-icons/md";
import { BsBuildings, BsPersonWorkspace } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { LiaNewspaperSolid } from "react-icons/lia";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { LuTableProperties } from "react-icons/lu";
import { RiMoneyCnyCircleLine } from "react-icons/ri";

// Adjust these variants according to your desired stiffness and damping for a bouncy effect
const sidebarVariants = {
  open: {
    width: "16rem",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  closed: {
    width: "4rem", // Adjust as necessary for just icons
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const dropdownVariants = {
  opened: {
    opacity: 1,
    height: "auto",
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 150,
      delay: 0.3,
      ease: "easeInOut",
    },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: { type: "spring", damping: 22, stiffness: 150 },
  },
};

// Example for good contrast styling (feel free to adjust)
const dropdownStyle = "bg-[#ff902f] text-white mt-2 rounded-md";

const Sidebar = () => {
  const [showEmployees, setShowEmployees] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false);
  const [showPositions, setShowPositions] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showPayroll, setShowPayroll] = useState(false);
  const [displayText, setDisplayText] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const user = secureLocalStorage.getItem("user");
    if (user) {
      setRole(user.role);
    }
  }, []);

  return (
    <>
      <motion.div
        className={`sidebar z-10`}
        animate={displayText ? "open" : "closed"}
        variants={sidebarVariants}
        initial={false}
      >
        <IsScrollable>
          <div
            onClick={() => setDisplayText(!displayText)}
            className="my-6 flex items-center gap-2 ml-auto p-2 bg-slate-800 w-fit rounded-md mx-2 cursor-pointer"
          >
            {displayText && <span>Close</span>}
            {!displayText ? (
              <MenuBar />
            ) : (
              <RxCross2 className="w-6 h-6 text-white" />
            )}
          </div>
          {/* Adjust ul and div structure for proper rendering */}
          <ul className="my-12">
            {/* Example entry with conditional rendering based on displayText */}
            <Link to="/">
              <div className="sidebar-item">
                <RxDashboard className="w-6 h-6" />
                {((displayText && role === "admin") || role === "manager") && (
                  <p>Dashboard</p>
                )}
                {displayText && role === "employee" && (
                  <p>Employee Dashboard</p>
                )}
              </div>
            </Link>
            {/* Extend the same conditional rendering approach to other list items */}

            {(role === "admin" || role === "manager") && (
              <div
                className="sidebar-item"
                onClick={() => setShowEmployees(!showEmployees)}
              >
                <GrUserWorker className="w-6 h-6" />
                {displayText && (
                  <span className="flex items-center">
                    Employees{" "}
                    {!showEmployees ? (
                      <MdOutlineChevronRight className="w-6 h-6" />
                    ) : (
                      <IoChevronDownOutline className="w-6 h-6" />
                    )}
                  </span>
                )}
              </div>
            )}

            <AnimatePresence>
              {showEmployees && (
                <motion.ul
                  className={dropdownStyle}
                  variants={dropdownVariants}
                  initial={"closed"}
                  animate={"opened"}
                  exit={"closed"}
                >
                  <Link to="/employee">
                    <div>
                      <CiViewList className="w-6 h-6" />
                      {displayText && <p>Employee List</p>}
                    </div>
                  </Link>
                  <Link to="/employee/details">
                    <div>
                      <TbListDetails className="w-6 h-6" />
                      {displayText && <p>Employee Details</p>}
                    </div>
                  </Link>
                  <Link to="/employee/add">
                    <div>
                      <IoPersonAddOutline className="w-6 h-6" />
                      {displayText && <p>Add Employee</p>}
                    </div>
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>

            {(role === "admin" || role === "manager") && (
              <div
                className="sidebar-item"
                onClick={() => setShowDepartments(!showDepartments)}
              >
                <BsBuildings className="w-6 h-6" />
                {displayText && (
                  <span className="flex items-center">
                    Departments{" "}
                    {!showDepartments ? (
                      <MdOutlineChevronRight className="w-6 h-6" />
                    ) : (
                      <IoChevronDownOutline className="w-6 h-6" />
                    )}
                  </span>
                )}
              </div>
            )}
            <AnimatePresence>
              {showDepartments && (
                <motion.ul
                  className={dropdownStyle}
                  variants={dropdownVariants}
                  initial={"closed"}
                  animate={"opened"}
                  exit={"closed"}
                >
                  <Link to="/department">
                    <div>
                      <CiViewList className="w-6 h-6" />
                      {displayText && <p>Departments List</p>}
                    </div>
                  </Link>
                  <Link to="/department/add">
                    <div>
                      <BsBuildings className="w-6 h-6" />
                      {displayText && <p>Add Department</p>}
                    </div>
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>

            {(role === "admin" || role === "manager") && (
              <div
                className="sidebar-item"
                onClick={(e) => setShowPositions(!showPositions)}
              >
                <BsPersonWorkspace className="w-6 h-6" />
                {displayText && (
                  <span className="flex items-center">
                    Positions{" "}
                    {!showPositions ? (
                      <MdOutlineChevronRight className="w-6 h-6" />
                    ) : (
                      <IoChevronDownOutline className="w-6 h-6" />
                    )}
                  </span>
                )}
              </div>
            )}

            <AnimatePresence>
              {showPositions && (
                <motion.ul
                  className={dropdownStyle}
                  variants={dropdownVariants}
                  initial={"closed"}
                  animate={"opened"}
                  exit={"closed"}
                >
                  <Link to="/position">
                    <div>
                      <CiViewList className="w-6 h-6" />
                      {displayText && <p>Position List</p>}
                    </div>
                  </Link>
                  <Link to="/position/add">
                    <div>
                      <HiOutlineFolderAdd className="w-6 h-6" />
                      {displayText && <p>Add Position</p>}
                    </div>
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>

            <div className="sidebar-item">
              <TbReportAnalytics className="w-6 h-6" />
              {displayText && <li>Reports</li>}
            </div>

            {(role === "admin" || role === "manager") && (
              <div
                className="sidebar-item"
                onClick={(e) => setShowAttendance(!showAttendance)}
              >
                <TbNotebook className="w-6 h-6" />
                {displayText && (
                  <>
                    <span className="flex items-center">Attendance </span>
                    {!showAttendance ? (
                      <MdOutlineChevronRight className="w-6 h-6" />
                    ) : (
                      <IoChevronDownOutline className="w-6 h-6" />
                    )}
                  </>
                )}
              </div>
            )}

            <AnimatePresence>
              {showAttendance && (
                <motion.ul
                  className={dropdownStyle}
                  variants={dropdownVariants}
                  initial={"closed"}
                  animate={"opened"}
                  exit={"closed"}
                >
                  <Link to="/attendance/details">
                    <div>
                      <CiViewList className="w-6 h-6" />
                      {displayText && <p>Attendance Details</p>}
                    </div>
                  </Link>
                  <Link to="/attendance">
                    <div>
                      <HiOutlineFolderAdd className="w-6 h-6" />
                      {displayText && <p>Mark Attendance</p>}
                    </div>
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>

            <div
              className="sidebar-item"
              onClick={(e) => setShowLeave(!showLeave)}
            >
              <LiaNewspaperSolid className="w-6 h-6" />
              {displayText && (
                <>
                  <span className="flex items-center">Leaves </span>
                  {!showLeave ? (
                    <MdOutlineChevronRight className="w-6 h-6" />
                  ) : (
                    <IoChevronDownOutline className="w-6 h-6" />
                  )}
                </>
              )}
            </div>

            <AnimatePresence>
              {showLeave && (
                <motion.ul
                  className={dropdownStyle}
                  variants={dropdownVariants}
                  initial={"closed"}
                  animate={"opened"}
                  exit={"closed"}
                >
                  {
                    <>
                      {role === "manager" ||
                        (role === "admin" && (
                          <Link to="/leave/details">
                            <div>
                              <CiViewList className="w-6 h-6" />
                              {displayText && <p>Leave Details</p>}
                            </div>
                          </Link>
                        ))}
                      {role === "employee" && (
                        <Link to="/leave/employeeleavedetail">
                          <div>
                            <LuTableProperties className="w-6 h-6" />
                            {displayText && <p>Employee Leaves</p>}
                          </div>
                        </Link>
                      )}
                    </>
                  }
                  {role === "employee" && (
                    <Link to="/leave">
                      <div>
                        <HiOutlineFolderAdd className="w-6 h-6" />
                        {displayText && <p>Request Leave</p>}
                      </div>
                    </Link>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>

            {role === "manager" ||
              (role === "admin" && (
                <div
                  onClick={() => setShowProject(!showProject)}
                  className="sidebar-item"
                >
                  <GoProjectSymlink className="w-6 h-6" />
                  {displayText && (
                    <>
                      <span className="flex items-center">Projects </span>
                      {!showProject ? (
                        <MdOutlineChevronRight className="w-6 h-6" />
                      ) : (
                        <IoChevronDownOutline className="w-6 h-6" />
                      )}
                    </>
                  )}
                </div>
              ))}

            <AnimatePresence>
              {showProject && (
                <motion.ul
                  className={dropdownStyle}
                  variants={dropdownVariants}
                  initial={"closed"}
                  animate={"opened"}
                  exit={"closed"}
                >
                  <Link to="/project">
                    <div>
                      <CiViewList className="w-6 h-6" />
                      {displayText && <p>Project Details</p>}
                    </div>
                  </Link>
                  <Link to="/project/add">
                    <div>
                      <HiOutlineFolderAdd className="w-6 h-6" />
                      {displayText && <p>Create a Project</p>}
                    </div>
                  </Link>
                  <Link to="/project/task/add">
                    <div>
                      <HiOutlineFolderAdd className="w-6 h-6" />
                      {displayText && <p>Add A Task</p>}
                    </div>
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>
            <Link to="/settings">
              <div className="sidebar-item">
                <LuSettings className="w-6 h-6" />
                {displayText && <li>Settings</li>}
              </div>
            </Link>
            {(role === "admin" || role === "manager") && (
              <div
                className="sidebar-item"
                onClick={(e) => setShowPayroll(!showPayroll)}
              >
                <RiMoneyCnyCircleLine className="w-6 h-6" />
                {displayText && (
                  <>
                    <span className="flex items-center">Payroll </span>
                    {!showPayroll ? (
                      <MdOutlineChevronRight className="w-6 h-6" />
                    ) : (
                      <IoChevronDownOutline className="w-6 h-6" />
                    )}
                  </>
                )}
              </div>
            )}
            <AnimatePresence>
              {showPayroll && (
                <motion.ul
                  className={dropdownStyle}
                  variants={dropdownVariants}
                  initial={"closed"}
                  animate={"opened"}
                  exit={"closed"}
                >
                  <Link to="/payroll">
                    <div>
                      <CiViewList className="w-6 h-6" />
                      {displayText && <p>Payroll Details</p>}
                    </div>
                  </Link>
                  <Link to="/payroll/add">
                    <div>
                      <HiOutlineFolderAdd className="w-6 h-6" />
                      {displayText && <p>Generate Payroll</p>}
                    </div>
                  </Link>
                </motion.ul>
              )}
            </AnimatePresence>
          </ul>
        </IsScrollable>
      </motion.div>
    </>
  );
};

export default Sidebar;
