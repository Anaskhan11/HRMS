// icons
import { FaRegUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { GoProject } from "react-icons/go";
import { BsBuildings } from "react-icons/bs";

// Components
import EmployeeChart from "../employee/EmployeeChart";
import EmployeeAgePieChart from "../employee/EmployeeAgePieChart";
import IsScrollable from "../common/Scrollable";

const Dashboard = () => {
  return (
    <section className="p-4 h-[86vh]">
      <IsScrollable>
        <h1 className="text-xl font-semibold text-[#7054f6]">Dashboard</h1>
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
          <div className="bg-[#7054f6] rounded-md shadow-md shadow-[#7054f6] flex gap-4 flex-col items-center justify-center p-4">
            <h2 className="text-md font-semibold">Total Admins</h2>
            <GrUserAdmin className="w-8 h-8" />
            <h2 className="text-3xl font-bold">14k Admins</h2>
          </div>
          <div className="bg-[#7054f6] rounded-md shadow-md shadow-[#7054f6] flex gap-4 flex-col items-center justify-center p-4">
            <h2 className="text-md font-semibold">Total Employees</h2>
            <FaRegUser className="w-8 h-8" />
            <h2 className="text-3xl font-bold">14k Employees</h2>
          </div>
          <div className="bg-[#7054f6] rounded-md shadow-md shadow-[#7054f6] flex gap-4 flex-col items-center justify-center p-4">
            <h2 className="text-md font-semibold">Total Projects</h2>
            <GoProject className="w-8 h-8" />
            <h2 className="text-3xl font-bold">100+ Projects</h2>
          </div>
          <div className="bg-[#7054f6] rounded-md shadow-md shadow-[#7054f6] flex gap-4 flex-col items-center justify-center p-4">
            <h2 className="text-md font-semibold">Total Departments</h2>
            <BsBuildings className="w-8 h-8" />
            <h2 className="text-3xl font-bold">20 Departments</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 h-[400px]">
          <div className="chart-container w-full my-4 h-full flex-1 card">
            <EmployeeChart />
          </div>
          <div className="chart-container flex-1 flex items-center justify-center h-full card">
            <EmployeeAgePieChart />
          </div>
        </div>
      </IsScrollable>
    </section>
  );
};

export default Dashboard;
