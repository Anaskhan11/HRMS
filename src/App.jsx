// libs
import { Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Require Auth
import RequireAuth from "./ProtectedRoutes/RequireAuth";
import PublicRoute from "./ProtectedRoutes/PublicRoute";

// Common Components
import Topbar from "./components/ui/Menubar/Topbar";
import Sidebar from "./components/ui/Menubar/Sidebar";

// context
import { useSidebarContext } from "./context/SidebarContext";

// Page Components
import Dashboard from "./components/ui/Dashboard/Dashboard";
import Employee from "./components/ui/employee/Employee";
import AddEmployee from "./components/ui/employee/AddEmployee";
import Login from "./components/ui/Login/Login";

function App() {
  const { state } = useSidebarContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout sidebar={state.sidebar} />}>
          <Route element={<RequireAuth />}>
            <Route index element={<Dashboard />} />
            <Route path="employee" element={<Employee />} />
            <Route path="employee/add" element={<AddEmployee />} />
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

function MainLayout({ sidebar }) {
  const sectionStyle = {
    width: sidebar ? "calc(100% - 16rem)" : "100%", // Adjust '16rem' to match your sidebar's width
  };

  return (
    <main className="flex h-screen">
      {sidebar ? <Sidebar /> : null}
      <section style={sectionStyle} className="flex flex-col">
        <Topbar />
        <Outlet /> {/* This is where nested routes will be rendered */}
      </section>
    </main>
  );
}

export default App;
