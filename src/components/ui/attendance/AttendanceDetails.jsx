import React from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { GoDotFill } from "react-icons/go";

const AttendanceDetails = () => {
  const getAllAttendance = async () => {
    const response = await axiosInstance.get(
      "/api/attendance/getAllEmployeeAttendance"
    );
    console.log(response.data);
    return response.data;
  };

  const {
    data: attendances,
    isLoading,
    error,
    isError,
  } = useQuery("attendances", getAllAttendance);

  if (isLoading) {
    return (
      <section className="p-4 my-6 h-screen">
        <Skeleton height={40} />
        <Skeleton count={5} />
      </section>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="p-4">
      <h1 className="text-3xl font-semibold text-secondary">
        Attedance Details
      </h1>
      <div className="my-6 overflow-x-auto relative sm:rounded-lg table-scroll">
        {/* Wrap the table in a div with the class "table-scroll" */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {/* Table contents */}

          <thead className="text-base font-bold uppercase text-gray-700 h-8">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>

              <th scope="col" className="py-3 px-6">
                Email
              </th>

              <th scope="col" className="py-3 px-6">
                Father Name
              </th>

              <th scope="col" className="py-3 px-6">
                Department
              </th>

              <th scope="col" className="py-3 px-6">
                Position
              </th>

              <th>Attendance Status</th>
            </tr>
          </thead>

          <tbody>
            {attendances.map((attendance) => (
              <tr
                key={attendance.employee_id}
                className="bg-white border-b light:bg-gray-200 light:border-gray-200"
              >
                <td className="py-4 px-6">{attendance.userName}</td>
                <td className="py-4 px-6">{attendance.email}</td>
                <td className="py-4 px-6">{attendance.father_name}</td>
                <td className="py-4 px-6">{attendance.departmentName}</td>
                <td className="py-4 px-6">{attendance.title}</td>
                <td className="text-center min-w-16">
                  <span
                    style={{ width: "62px", padding: "4px" }}
                    className={`${
                      attendance.status === "present"
                        ? "bg-green-500"
                        : attendance.status === "absent"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    } flex items-center rounded-full justify-center text-white`}
                  >
                    {attendance.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AttendanceDetails;
