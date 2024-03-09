// // libs
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import IsScrollable from "../common/Scrollable";
// import { motion } from "framer-motion";

// // Icons
// import { RxDashboard } from "react-icons/rx";
// import { GrUserWorker } from "react-icons/gr";
// import { TbReportAnalytics } from "react-icons/tb";
// import { TbNotebook } from "react-icons/tb";
// import { GoProjectSymlink } from "react-icons/go";
// import { LuSettings } from "react-icons/lu";
// import { CiViewList } from "react-icons/ci";
// import { TbListDetails } from "react-icons/tb";
// import { IoPersonAddOutline } from "react-icons/io5";
// import { MdOutlineChevronRight } from "react-icons/md";
// import { IoChevronDownOutline } from "react-icons/io5";
// import { BsBuildings } from "react-icons/bs";
// import { BsPersonWorkspace } from "react-icons/bs";
// import { RxCross2 } from "react-icons/rx";

// const Sidebar = () => {
//   const [showEmployees, setShowEmployees] = useState(false);
//   const [showDepartments, setShowDepartments] = useState(false);
//   const [showPositions, setShowPositions] = useState(false);
//   const [displayText, setDisplayText] = useState(true);

//   // Sidebar animation variants
//   const sidebarVariants = {
//     open: { width: "16rem", transition: { type: "spring", stiffness: 500, damping: 30 } },
//     closed: { width: "auto", transition: { type: "spring", stiffness: 500, damping: 30 } },
//   };

//   // Text animation variants (fade in and out)
//   const textVariants = {
//     show: { opacity: 1, display: "inline", transition: { duration: 0.5 } },
//     hide: { opacity: 0, transition: { duration: 0.5 }, transitionEnd: { display: "none" } },
//   };

//   return (
//     <>
//       <motion.div
//         className={`sidebar z-10 ${!displayText && "w-64"}`}
//         animate={sidebarAnimation}
//         initial={false}
//       >
//         <div className={!displayText ? "sidebar w-64 z-10" : "sidebar z-10"}>
//           <IsScrollable>
//             <div
//               onClick={() => setDisplayText(!displayText)}
//               className="my-2 flex items-center gap-2 ml-auto p-2 bg-slate-800 w-fit rounded-md mx-2 cursor-pointer"
//             >
//               {!displayText && <span>Close</span>}
//               <RxCross2 className="w-6 h-6 text-white" />
//             </div>
//             <ul className="my-12">
//               <div>
//                 <RxDashboard className="w-6 h-6" />
//                 {!displayText && <Link to="/">Dashboard</Link>}
//               </div>
//               <div onClick={() => setShowEmployees(!showEmployees)}>
//                 <GrUserWorker className="w-6 h-6" />
//                 {!displayText && (
//                   <span className="flex items-center">
//                     Employees{" "}
//                     {!showEmployees ? (
//                       <MdOutlineChevronRight className="w-6 h-6" />
//                     ) : (
//                       <IoChevronDownOutline className="w-6 h-6" />
//                     )}
//                   </span>
//                 )}
//               </div>
//               {showEmployees && (
//                 <ul className="p-2 bg-violet-400">
//                   <div>
//                     <CiViewList className="w-6 h-6" />
//                     {!displayText && <Link to="/employee">Employee List</Link>}
//                   </div>
//                   <div>
//                     <TbListDetails className="w-6 h-6" />
//                     {!displayText && (
//                       <Link to="/employee/details">Employee Details</Link>
//                     )}
//                   </div>
//                   <div>
//                     <IoPersonAddOutline className="w-6 h-6" />
//                     {!displayText && (
//                       <Link to="/employee/add">Add Employee</Link>
//                     )}
//                   </div>
//                 </ul>
//               )}
//               <div onClick={() => setShowDepartments(!showDepartments)}>
//                 <BsBuildings className="w-6 h-6" />
//                 {!displayText && (
//                   <span className="flex items-center">
//                     Departments{" "}
//                     {!showDepartments ? (
//                       <MdOutlineChevronRight className="w-6 h-6" />
//                     ) : (
//                       <IoChevronDownOutline className="w-6 h-6" />
//                     )}
//                   </span>
//                 )}
//               </div>
//               {showDepartments && (
//                 <ul className="p-2 bg-violet-400">
//                   <div>
//                     <CiViewList className="w-6 h-6" />
//                     {!displayText && (
//                       <Link to="/department">Departments List</Link>
//                     )}
//                   </div>
//                   <div>
//                     <BsBuildings className="w-6 h-6" />
//                     {!displayText && (
//                       <Link to="/department/add">Add Department</Link>
//                     )}
//                   </div>
//                 </ul>
//               )}
//               <div onClick={() => setShowPositions(!showPositions)}>
//                 <BsPersonWorkspace className="w-6 h-6" />
//                 {!displayText && (
//                   <span className="flex items-center">
//                     Positions{" "}
//                     {!showPositions ? (
//                       <MdOutlineChevronRight className="w-6 h-6" />
//                     ) : (
//                       <IoChevronDownOutline className="w-6 h-6" />
//                     )}
//                   </span>
//                 )}
//               </div>
//               {showPositions && (
//                 <ul className="p-2 bg-violet-400">
//                   <div>
//                     <CiViewList className="w-6 h-6" />
//                     {!displayText && <Link to="/position">Position List</Link>}
//                   </div>
//                   <div>
//                     <BsBuildings className="w-6 h-6" />
//                     {!displayText && (
//                       <Link to="/position/add">Add Position</Link>
//                     )}
//                   </div>
//                 </ul>
//               )}
//               <div>
//                 <TbReportAnalytics className="w-6 h-6" />
//                 {!displayText && <li>Reports</li>}
//               </div>
//               <div>
//                 <TbNotebook className="w-6 h-6" />
//                 {!displayText && <li>Attendance</li>}
//               </div>
//               <div>
//                 <GoProjectSymlink className="w-6 h-6" />
//                 {!displayText && <li>Projects</li>}
//               </div>
//               <div>
//                 <LuSettings className="w-6 h-6" />
//                 {!displayText && <li>Settings</li>}
//               </div>
//             </ul>
//           </IsScrollable>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default Sidebar;

// Libs
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import IsScrollable from "../common/Scrollable";

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
const dropdownStyle = "bg-yellow-700 text-white p-2 mt-2 rounded-md";

const Sidebar = () => {
  const [showEmployees, setShowEmployees] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false);
  const [showPositions, setShowPositions] = useState(false);
  const [displayText, setDisplayText] = useState(true);

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
            className="my-2 flex items-center gap-2 ml-auto p-2 bg-slate-800 w-fit rounded-md mx-2 cursor-pointer"
          >
            {displayText && <span>Close</span>}
            <RxCross2 className="w-6 h-6 text-white" />
          </div>
          {/* Adjust ul and div structure for proper rendering */}
          <ul className="my-12">
            {/* Example entry with conditional rendering based on displayText */}
            <div>
              <RxDashboard className="w-6 h-6" />
              {displayText && <Link to="/">Dashboard</Link>}
            </div>
            {/* Extend the same conditional rendering approach to other list items */}

            <div onClick={() => setShowEmployees(!showEmployees)}>
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
            <AnimatePresence>
              {showEmployees && (
                <motion.ul
                  className={dropdownStyle}
                  variants={dropdownVariants}
                  initial={"closed"}
                  animate={"opened"}
                  exit={"closed"}
                >
                  <div>
                    <CiViewList className="w-6 h-6" />
                    {displayText && <Link to="/employee">Employee List</Link>}
                  </div>
                  <div>
                    <TbListDetails className="w-6 h-6" />
                    {displayText && (
                      <Link to="/employee/details">Employee Details</Link>
                    )}
                  </div>
                  <div>
                    <IoPersonAddOutline className="w-6 h-6" />
                    {displayText && (
                      <Link to="/employee/add">Add Employee</Link>
                    )}
                  </div>
                </motion.ul>
              )}
            </AnimatePresence>

            <div onClick={() => setShowDepartments(!showDepartments)}>
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
            <AnimatePresence>
              {showDepartments && (
                <motion.ul
                  className={dropdownStyle}
                  variants={dropdownVariants}
                  initial={"closed"}
                  animate={"opened"}
                  exit={"closed"}
                >
                  <div>
                    <CiViewList className="w-6 h-6" />
                    {displayText && (
                      <Link to="/department">Departments List</Link>
                    )}
                  </div>
                  <div>
                    <BsBuildings className="w-6 h-6" />
                    {displayText && (
                      <Link to="/department/add">Add Department</Link>
                    )}
                  </div>
                </motion.ul>
              )}
            </AnimatePresence>

            <div onClick={(e) => setShowPositions(!showPositions)}>
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
            <AnimatePresence>
              {showPositions && (
                <motion.ul
                  className={dropdownStyle}
                  variants={dropdownVariants}
                  initial={"closed"}
                  animate={"opened"}
                  exit={"closed"}
                >
                  <div>
                    <CiViewList className="w-6 h-6" />
                    {displayText && <Link to="/position">Position List</Link>}
                  </div>
                  <div>
                    <BsBuildings className="w-6 h-6" />
                    {displayText && (
                      <Link to="/position/add">Add Position</Link>
                    )}
                  </div>
                </motion.ul>
              )}
            </AnimatePresence>

            <div>
              <TbReportAnalytics className="w-6 h-6" />
              {displayText && <li>Reports</li>}
            </div>
            <div>
              <TbNotebook className="w-6 h-6" />
              {displayText && <li>Attendance</li>}
            </div>
            <div>
              <GoProjectSymlink className="w-6 h-6" />
              {displayText && <li>Projects</li>}
            </div>
            <div>
              <LuSettings className="w-6 h-6" />
              {displayText && <li>Settings</li>}
            </div>
          </ul>
        </IsScrollable>
      </motion.div>
    </>
  );
};

export default Sidebar;
