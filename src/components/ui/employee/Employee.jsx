// Libs
import React from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Icons
import { TbEdit } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { GrDescend } from "react-icons/gr";
import { GrAscend } from "react-icons/gr";

const Employee = () => {
  const getAllEmployees = async () => {
    const response = await axiosInstance.get("/api/employee/getAllEmployees");
    return response.data;
  };

  const {
    data: employees,
    isLoading,
    error,
    isError,
  } = useQuery("employees", getAllEmployees);

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
      <h1 className="text-3xl font-semibold text-secondary">Employee</h1>
      <div className="my-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          <div className="border border-slate-500 rounded-md p-4">
            <input
              type="text"
              placeholder="employee id"
              className="border-none outline-none px-0 py-0 w-full"
            />
          </div>
          <div className="border border-slate-500 rounded-md p-4">
            <input
              type="text"
              placeholder="employee name"
              className="border-none outline-none px-0 py-0 w-full"
            />
          </div>

          <select
            name="position"
            id="position"
            className="px-4 py-4 rounded-md border border-slate-500 outline-none w-full"
          >
            <option value="position">Position</option>
          </select>

          <button className="px-4 py-4 rounded-md bg-primary text-white w-full">
            Search
          </button>
        </div>
        <div style={{ flex: 1, overflowX: "auto" }}>
          <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
            <thead className="text-base font-bold uppercase text-gray-700 h-8">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Image
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>

                <th scope="col" className="py-3 px-6">
                  Email
                </th>

                <th scope="col" className="py-3 px-6">
                  Role
                </th>

                <th scope="col" className="py-3 px-6">
                  Father Name
                </th>

                <th scope="col" className="py-3 px-6">
                  Gender
                </th>

                <th scope="col" className="py-3 px-6">
                  Religion
                </th>

                <th scope="col" className="py-3 px-6">
                  Phone Number
                </th>

                <th scope="col" className="py-3 px-6">
                  Emergency Contact
                </th>

                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {employees.result.map((employee) => (
                <tr
                  className="border-b light:bg-gray-200 light:border-gray-200"
                  key={employee.employee_id}
                >
                  <td className="py-4 px-6">
                    <FaRegUser className="w-6 h-6" />
                  </td>
                  <td className="py-4 px-6">{employee.name}</td>
                  <td className="py-4 px-6">{employee.email}</td>
                  <td className="py-4 px-6">{employee.role}</td>
                  <td className="py-4 px-6">{employee.father_name}</td>
                  <td className="py-4 px-6">{employee.gender}</td>
                  <td className="py-4 px-6">{employee.religion}</td>
                  <td className="py-4 px-6">{employee.phone_number}</td>
                  <td className="py-4 px-6">{employee.emergency_contact}</td>
                  <td className="py-4 px-6">
                    <a
                      href="#"
                      className="font-medium text-primary hover:underline"
                    >
                      <TbEdit className="w-6 h-6" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Employee;
