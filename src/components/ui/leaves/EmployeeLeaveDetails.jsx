// Libs
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import secureLocalStorage from "react-secure-storage";

// Icons
import { LuTrash } from "react-icons/lu";
import { FaRegCalendarPlus } from "react-icons/fa";
import { FaRegCalendarMinus } from "react-icons/fa";

const EmployeeLeaveDetails = () => {
  const getAllLeaves = async () => {
    const response = await axiosInstance.get(
      `/api/leave/getEmployeeLeave/` +
        secureLocalStorage.getItem("user").employee_id
    );
    console.log(response.data);
    return response.data;
  };

  const {
    data: leaves,
    isLoading,
    error,
    isError,
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
      <h1 className="text-3xl font-semibold text-secondary">Your Leaves</h1>
      <div className="my-6 w-full flex items-center flex-wrap gap-2">
        {leaves.map((leave) => (
          <div
            key={leave.leave_id}
            className="p-2 flex flex-col items-center gap-4 rounded-md shadow shadow-sm shadow-gray-400 bg-white text-secondary "
          >
            <div className="flex items-center self-start justify-between w-full">
              <h1
                className={`text-2xl font-bold rounded-md ${
                  leave.status === "Rejected"
                    ? "text-red-500"
                    : leave.status === "Accepted"
                    ? "text-green-600"
                    : "text-yellow-500"
                }`}
              >
                {leave.status}
              </h1>
              {leave.status !== "Accepted" && (
                <button className="p-1 rounded-md bg-red-500 hover:scale-125 transition-all">
                  <LuTrash className="text-white cursor-pointer h-6 w-6" />
                </button>
              )}
            </div>
            <p className="font-bold w-fit self-start">
              {leave.leave_type.slice(0, 20)}
            </p>
            <div className="flex items-center gap-3">
              <p className="font-bold text-secondary flex items-center gap-1">
                <FaRegCalendarMinus className="text-green-500" />
                <span>{leave.start_date}</span>
              </p>
              <p className="font-bold text-secondary flex items-center gap-1">
                <FaRegCalendarPlus className="text-red-500" />
                <span>{leave.end_date}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EmployeeLeaveDetails;
