import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SingleUserAttendance from "./SingleUserAttendance";
import TableSkeleton from "../common/TableSkeleton";

const Attendance = () => {
  const [date, setDate] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("mm", "dd", "yyyy");
    setDate(today);
  }, []);

  const getAllAttendance = async () => {
    const response = await axiosInstance.get(
      "/api/attendance/getAllAttendance"
    );
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
        <div className="my-6 overflow-x-auto relative shadow-md sm:rounded-lg table-scroll">
          <TableSkeleton rows={10} columns={6} />
        </div>
      </section>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="p-4">
      <h1 className="text-3xl font-semibold text-secondary">
        Employee Attedance
      </h1>
      <div className="flex items-center gap-2 justify-end">
        <input
          type="date"
          className="w-1/4 p-2 border-2 border-green-500 rounded-lg"
          value={inputValue}
          onChange={(e) => {
            const date = new Date(e.target.value);
            const formattedDate = `${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear()}`;
            setDate(formattedDate);
            setInputValue(e.target.value);
          }}
        />
      </div>
      <span className="text-sm font-bold text-green-600">{date}</span>
      <div className="my-6 overflow-x-auto relative shadow-md sm:rounded-lg table-scroll">
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
                <td>
                  <SingleUserAttendance
                    employee_id={attendance.employee_id}
                    date={date}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Attendance;
