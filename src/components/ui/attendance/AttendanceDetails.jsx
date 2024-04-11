import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { GoDotFill } from "react-icons/go";

const AttendanceDetails = () => {
  const [date, setDate] = useState("");
  const [filteredAttendances, setFilteredAttendances] = useState([]);

  const getAllAttendance = async () => {
    const response = await axiosInstance.get(
      "/api/attendance/getAllEmployeeAttendance"
    );
    return response.data;
  };

  const {
    data: attendances,
    isLoading,
    error,
    isError,
  } = useQuery("attendances", getAllAttendance);

  useEffect(() => {
    setFilteredAttendances(attendances || []);
  }, [attendances]);

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

  const handleSearch = () => {
    if (date) {
      const selectedDate = new Date(date);
      const formattedDate = `${
        selectedDate.getMonth() + 1
      }/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
      const filtered = attendances.filter(
        (attendance) => attendance.date === formattedDate
      );
      setFilteredAttendances(filtered);
    } else {
      setFilteredAttendances(attendances);
    }
  };

  return (
    <section className="p-4">
      <h1 className="text-3xl font-semibold text-secondary">
        Attedance Details
      </h1>
      <div className="flex items-center gap-2 justify-end">
        <input
          type="date"
          className="
          w-1/4 p-2 border-2 border-green-500 rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className="px-6 py-3 rounded-md bg-primary text-white"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
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

              <th scope="col" className="py-3 px-6">
                Date
              </th>

              <th>Attendance Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredAttendances.map((attendance, index) => (
              <tr
                key={index}
                className="bg-white border-b light:bg-gray-200 light:border-gray-200"
              >
                <td className="py-4 px-6">{attendance.userName}</td>
                <td className="py-4 px-6">{attendance.email}</td>
                <td className="py-4 px-6">{attendance.father_name}</td>
                <td className="py-4 px-6">{attendance.departmentName}</td>
                <td className="py-4 px-6">{attendance.title}</td>
                <td className="py-4 px-6">{attendance.date}</td>
                <td className="text-center min-w-16">
                  <p
                    style={{ width: "100px", padding: "4px" }}
                    className={`border-2 ${
                      attendance.status === "present"
                        ? "border-green-500 text-green-500"
                        : attendance.status === "absent"
                        ? "border-red-500 text-red-500"
                        : "border-yellow-500 text-yellow-500"
                    } flex items-center rounded-full justify-center cursor-pointer`}
                  >
                    <span
                      className={`${
                        attendance.status === "present"
                          ? "text-green-500 animate-pulse"
                          : attendance.status === "absent"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      <GoDotFill />
                    </span>
                    <span>{attendance.status}</span>
                  </p>
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
