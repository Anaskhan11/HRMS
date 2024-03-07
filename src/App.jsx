// libs
import { Routes, Route, Outlet } from "react-router-dom";

// Require Auth
import RequireAuth from "./ProtectedRoutes/RequireAuth";
import PublicRoute from "./ProtectedRoutes/PublicRoute";

// Common Components
import Topbar from "./components/ui/Menubar/Topbar";
import Sidebar from "./components/ui/Menubar/Sidebar";

// Page Components
import Dashboard from "./components/ui/Dashboard/Dashboard";
import Employee from "./components/ui/employee/Employee";
import AddEmployee from "./components/ui/employee/AddEmployee";
import Login from "./components/ui/Login/Login";
import { useSidebarContext } from "./context/SidebarContext";

function App() {
  const { state } = useSidebarContext();

  return (
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
  );
}

function MainLayout({ sidebar }) {
  return (
    <main className="flex h-screen">
      {sidebar ? <Sidebar /> : null}
      <section className="flex flex-col w-full">
        <Topbar />
        <Outlet /> {/* This is where nested routes will be rendered */}
      </section>
    </main>
  );
}

export default App;
