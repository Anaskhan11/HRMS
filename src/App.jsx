// libs
import { Routes, Route } from "react-router-dom";

// Common Components
import Topbar from "./components/ui/Menubar/Topbar";
import Sidebar from "./components/ui/Menubar/Sidebar";

// Page Components
import Dashboard from "./components/ui/Dashboard/Dashboard";
import Employee from "./components/ui/employee/Employee";
import { useSidebarContext } from "./context/SidebarContext";
import AddEmployee from "./components/ui/employee/AddEmployee";

function App() {
  const { state } = useSidebarContext();
  console.log(state);
  return (
    <main className="flex h-screen">
      {state.sidebar ? <Sidebar /> : null}
      <section className="flex flex-col w-full">
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/employee/add" element={<AddEmployee />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
