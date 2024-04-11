// libs
import { useEffect, useState, Suspense, lazy } from "react";
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
import Loading from "./components/ui/common/Loading";

// Page Components
const Dashboard = lazy(() => import("./components/ui/Dashboard/Dashboard"));
const EmployeeDashboard = lazy(() =>
  import("./components/ui/Dashboard/EmployeeDashboard")
);
const Employee = lazy(() => import("./components/ui/employee/Employee"));
const AddEmployee = lazy(() => import("./components/ui/employee/AddEmployee"));
const Department = lazy(() => import("./components/ui/departments/Department"));
const AddDepartment = lazy(() =>
  import("./components/ui/departments/AddDepartment")
);
const Login = lazy(() => import("./components/ui/Login/Login"));
const Position = lazy(() => import("./components/ui/positions/Position"));
const AddPosition = lazy(() => import("./components/ui/positions/AddPosition"));
const Attendance = lazy(() => import("./components/ui/attendance/Attendance"));
const AttendanceDetails = lazy(() =>
  import("./components/ui/attendance/AttendanceDetails")
);
const RequestLeave = lazy(() => import("./components/ui/leaves/RequestLeave"));
const Leave = lazy(() => import("./components/ui/leaves/Leave"));
const ManagerDashboard = lazy(() =>
  import("./components/ui/Dashboard/ManagerDashboard")
);
const EmployeeLeaveDetails = lazy(() =>
  import("./components/ui/leaves/EmployeeLeaveDetails")
);
const AddProject = lazy(() => import("./components/ui/projects/AddProject"));
const Projects = lazy(() => import("./components/ui/projects/Projects"));
const AddTask = lazy(() => import("./components/ui/projects/AddTask"));
const ProjectDetails = lazy(() =>
  import("./components/ui/projects/ProjectDetails")
);
const Settings = lazy(() => import("./components/ui/settings/Setting"));
const Payroll = lazy(() => import("./components/ui/payroll/Payroll"));
const Addpayroll = lazy(() => import("./components/ui/payroll/Addpayroll"));
const AssignAssets = lazy(() =>
  import("./components/ui/employee/AssignAssets")
);
const EmployeeAssets = lazy(() =>
  import("./components/ui/employee/EmployeeAssets")
);
const SalaryInformation = lazy(() =>
  import("./components/ui/employee/SalaryInformation")
);

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
      <Suspense fallback={<Loading />}>
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
              <Route path="assign/assets" element={<AssignAssets />} />
              <Route path="/employeeassets" element={<EmployeeAssets />} />
              <Route
                path="/salaryinformation"
                element={<SalaryInformation />}
              />
              <Route path="department" element={<Department />} />
              <Route path="department/add" element={<AddDepartment />} />
              <Route path="position" element={<Position />} />
              <Route path="position/add" element={<AddPosition />} />
              <Route path="attendance" element={<Attendance />} />
              <Route
                path="attendance/details"
                element={<AttendanceDetails />}
              />
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
      </Suspense>
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
