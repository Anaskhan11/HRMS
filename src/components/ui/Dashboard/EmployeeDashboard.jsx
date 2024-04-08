import { useQuery } from "react-query";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../../api/axios";
import { FaRegUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { GoProject } from "react-icons/go";
import { BsBuildings } from "react-icons/bs";
import IsScrollable from "../common/Scrollable";

const EmployeeDashboard = () => {
  const getDashboardData = async () => {
    const response = await axiosInstance.get(
      `/api/employee/getEmployeeDashboardData/${
        secureLocalStorage.getItem("user").employee_id
      }`
    );
    return response.data;
  };

  const { data, isLoading, error, isError } = useQuery(
    "dashboardData",
    getDashboardData
  );

  const totalLeaves = data?.leave_requests?.length || 0;
  const acceptedLeaves = data?.leave_requests?.filter(
    (leave) => leave.status === "Accepted"
  ).length;
  const rejectedLeaves = data?.leave_requests?.filter(
    (leave) => leave.status === "Rejected"
  ).length;
  const maxLeavesPerMonth = 4;
  const leaveProgress = (totalLeaves / maxLeavesPerMonth) * 100;

  return (
    <section className="p-4 h-[86vh]">
      <IsScrollable>
        <h1 className="text-3xl font-semibold text-primary">
          Employee Dashboard
        </h1>
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
          <div className="bg-primary rounded-md shadow-md shadow-primary flex gap-4 flex-col items-center justify-center p-4">
            <h2 className="text-md font-semibold">Current Position</h2>
            <GrUserAdmin className="w-8 h-8" />
            <h2 className="text-3xl font-bold text-center">
              {data && data.title}
            </h2>
          </div>
          <div className="bg-primary rounded-md shadow-md shadow-primary flex gap-4 flex-col items-center justify-center p-4">
            <h2 className="text-md font-semibold">Total Positions</h2>
            <FaRegUser className="w-8 h-8" />
            <h2 className="text-3xl font-bold text-center">
              {data && data.projects ? data.projects.length : 0}
            </h2>
          </div>
          <div className="bg-primary rounded-md shadow-md shadow-primary flex gap-4 flex-col items-center justify-center p-4">
            <h2 className="text-md font-semibold ">Total Projects</h2>
            <GoProject className="w-8 h-8" />
            <h2 className="text-3xl font-bold text-center">
              {data &&
                data.projects &&
                data.projects.map((project) => (
                  <div key={project.project_id}>
                    {project.project_name !== "NULL"
                      ? project.project_name
                      : "No projects"}
                  </div>
                ))}
            </h2>
          </div>
          <div className="bg-primary rounded-md shadow-md shadow-primary flex gap-4 flex-col items-center justify-center p-4">
            <h2 className="text-md font-semibold">Department</h2>
            <BsBuildings className="w-8 h-8" />
            <h2 className="text-3xl font-bold text-center">
              {data && data.name}
            </h2>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Leave Status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-500 rounded-md shadow-md p-4 text-white flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold">Total Leaves</h3>
              <p className="text-3xl font-bold">{totalLeaves}</p>
            </div>
            <div className="bg-green-500 rounded-md shadow-md p-4 text-white flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold">Accepted Leaves</h3>
              <p className="text-3xl font-bold">{acceptedLeaves}</p>
            </div>
            <div className="bg-red-500 rounded-md shadow-md p-4 text-white flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold">Rejected Leaves</h3>
              <p className="text-3xl font-bold">{rejectedLeaves}</p>
            </div>
            <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Leave Progress
              </h3>
              <div className="flex items-center justify-center">
                <div
                  className="w-24 h-24 rounded-full border-8 border-green-500"
                  style={{
                    borderRightColor: leaveProgress >= 100 ? "green" : "gray",
                    borderTopColor: leaveProgress >= 50 ? "green" : "gray",
                    borderLeftColor: leaveProgress >= 25 ? "green" : "gray",
                  }}
                >
                  <div className="flex items-center justify-center h-full">
                    <span className="text-xl font-bold text-gray-800">
                      {leaveProgress.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IsScrollable>
    </section>
  );
};

export default EmployeeDashboard;
