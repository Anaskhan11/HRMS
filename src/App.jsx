// libs
import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import secureLocalStorage from "react-secure-storage";
import "react-toastify/dist/ReactToastify.css";

// Require Auth
import RequireAuth from "./ProtectedRoutes/RequireAuth";
import PublicRoute from "./ProtectedRoutes/PublicRoute";

// Common Components
import Topbar from "./components/ui/Menubar/Topbar";
import Sidebar from "./components/ui/Menubar/Sidebar";

// Page Components
import Dashboard from "./components/ui/Dashboard/Dashboard";
import EmployeeDashboard from "./components/ui/Dashboard/EmployeeDashboard";
import Employee from "./components/ui/employee/Employee";
import AddEmployee from "./components/ui/employee/AddEmployee";
import Department from "./components/ui/departments/Department";
import AddDepartment from "./components/ui/departments/AddDepartment";
import Login from "./components/ui/Login/Login";
import Position from "./components/ui/positions/Position";
import AddPosition from "./components/ui/positions/AddPosition";
import Attendance from "./components/ui/attendance/Attendance";
import AttendanceDetails from "./components/ui/attendance/AttendanceDetails";
import RequestLeave from "./components/ui/leaves/RequestLeave";
import Leave from "./components/ui/leaves/Leave";
import ManagerDashboard from "./components/ui/Dashboard/ManagerDashboard";
import EmployeeLeaveDetails from "./components/ui/leaves/EmployeeLeaveDetails";
import AddProject from "./components/ui/projects/AddProject";
import Projects from "./components/ui/projects/Projects";
import AddTask from "./components/ui/projects/AddTask";
import ProjectDetails from "./components/ui/projects/ProjectDetails";
import Settings from "./components/ui/settings/Setting";
import Payroll from "./components/ui/payroll/Payroll";
import Addpayroll from "./components/ui/payroll/Addpayroll";

function App() {
  const [role, setRole] = useState(null);
  const { state } = useContext(AuthContext);
  console.log("USER_ROLE_STATE:", state);

  useEffect(() => {
    const user = secureLocalStorage.getItem("user");
    if (user) {
      setRole(user.role);
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={<RequireAuth />}>
            <Route
              index
              element={
                role === "admin" ? (
                  <Dashboard />
                ) : role === "manager" ? (
                  <ManagerDashboard />
                ) : (
                  <EmployeeDashboard />
                )
              }
            />
            <Route path="employee" element={<Employee />} />
            <Route path="employee/add" element={<AddEmployee />} />
            <Route path="department" element={<Department />} />
            <Route path="department/add" element={<AddDepartment />} />
            <Route path="position" element={<Position />} />
            <Route path="position/add" element={<AddPosition />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="attendance/details" element={<AttendanceDetails />} />
            <Route path="leave/details" element={<Leave />} />
            <Route path="leave" element={<RequestLeave />} />
            <Route
              path="leave/employeeleavedetail"
              element={<EmployeeLeaveDetails />}
            />

            <Route path="project" element={<Projects />} />
            <Route path="project/add" element={<AddProject />} />
            <Route path="project/task/add" element={<AddTask />} />
            <Route path="project/detail/:id" element={<ProjectDetails />} />
            <Route path="settings" element={<Settings />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/payroll/add" element={<Addpayroll />} />
          </Route>
        </Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

function MainLayout() {
  const sectionStyle = {
    flex: "1",
    overflowY: "scroll",
    scrollbarWidth: "thin",
    scrollbarColor: "transparent transparent",
  };

  return (
    <main className="flex h-screen w-screen overflow-hidden">
      {<Sidebar />}
      <section style={sectionStyle} className="main-scroll flex flex-col">
        <Topbar />
        <Outlet /> {/* This is where nested routes will be rendered */}
      </section>
    </main>
  );
}

export default App;
