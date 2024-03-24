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
    <section className="p-4 h-[100vh] dark:bg-gray-800 dark:text-gray-200">
      <IsScrollable>
        <h1 className="text-3xl font-semibold text-secondary">
          Admin Dashboard
        </h1>
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-primary">
          <div className="bg-white rounded-md shadow-md flex gap-4 flex-col items-center justify-center p-4">
            <h2 className="text-md font-semibold">Total Admins</h2>
            <GrUserAdmin className="w-8 h-8" />
            <h2 className="text-3xl font-bold text-center">14k Admins</h2>
          </div>
          <div className="bg-white rounded-md shadow-md flex gap-4 flex-col items-center justify-center p-4">
            <h2 className="text-md font-semibold">Total Employees</h2>
            <FaRegUser className="w-8 h-8" />
            <h2 className="text-3xl font-bold text-center">14k Employees</h2>
          </div>
          <div className="bg-white rounded-md shadow-md flex gap-4 flex-col items-center justify-center p-4">
            <h2 className="text-md font-semibold ">Total Projects</h2>
            <GoProject className="w-8 h-8" />
            <h2 className="text-3xl font-bold text-center">100+ Projects</h2>
          </div>
          <div className="bg-white rounded-md shadow-md flex gap-4 flex-col items-center justify-center p-4">
            <h2 className="text-md font-semibold">Total Departments</h2>
            <BsBuildings className="w-8 h-8" />
            <h2 className="text-3xl font-bold text-center">20 Departments</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 h-52 sm:h-52 md:h-72 lg:h-96">
          <div className="flex items-center justify-center h-60 sm:h-auto p-4 rounded shadow shadow-md bg-white">
            <EmployeeChart />
          </div>
          <div className="flex items-center justify-center h-60 sm:h-auto p-4 rounded shadow shadow-md bg-white">
            <EmployeeAgePieChart />
          </div>
        </div>
      </IsScrollable>
    </section>
  );
};

export default Dashboard;
