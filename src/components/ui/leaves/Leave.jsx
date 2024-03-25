import React, { useState } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ManageEmployeeLeave from "./ManageEmployeeLeave";

const Leave = () => {
  const getAllLeaves = async () => {
    const response = await axiosInstance.get("/api/leave/getLeaves");
    console.log(response.data);
    return response.data;
  };

  const {
    data: leaves,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery("leaves", getAllLeaves);

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
      <h1 className="text-3xl font-semibold text-secondary">Employee Leaves</h1>
      <div className="my-6 overflow-x-auto relative shadow-md sm:rounded-lg table-scroll">
        {/* Wrap the table in a div with the class "table-scroll" */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {/* Table contents */}

          <thead className="text-base font-bold uppercase text-gray-700 h-8">
            <tr>
              <th scope="col" className="py-3 px-6">
                leave_id
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>

              <th scope="col" className="py-3 px-6">
                Email
              </th>

              <th scope="col" className="py-3 px-6">
                Department
              </th>

              <th scope="col" className="py-3 px-6">
                Position
              </th>

              <th scope="col" className="py-3 px-6">
                Start Date
              </th>

              <th scope="col" className="py-3 px-6">
                End Date
              </th>

              <th scope="col" className="py-3 px-6">
                Leave Type
              </th>

              <th scope="col" className="py-3 px-6">
                Status
              </th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr
                key={leave.leave_id}
                className="bg-white border-b light:bg-gray-200 light:border-gray-200"
              >
                <td className="py-4 px-6">{leave.leave_id}</td>
                <td className="py-4 px-6">{leave.name}</td>
                <td className="py-4 px-6">{leave.email}</td>
                <td className="py-4 px-6">{leave.department_name}</td>
                <td className="py-4 px-6">{leave.position_name}</td>
                <td className="py-4 px-6">{leave.start_date}</td>
                <td className="py-4 px-6">{leave.end_date}</td>
                <td className={`py-4 px-6`}>{leave.leave_type}</td>
                <td
                  className={`py-4 px-6 ${
                    leave.status === "Accepted"
                      ? "text-green-500"
                      : leave.status === "Rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {leave.status}
                </td>
                <td>
                  <ManageEmployeeLeave
                    initialState={leave.status}
                    leave_id={leave.leave_id}
                    refetchLeaves={refetch}
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

export default Leave;
