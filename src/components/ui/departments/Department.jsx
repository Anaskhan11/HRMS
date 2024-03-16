import React from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Department = () => {
  const getAllDepartments = async () => {
    const response = await axiosInstance.get(
      "/api/department/getAllDepartment"
    );
    return response.data;
  };

  const {
    data: departments,
    isLoading,
    error,
    isError,
  } = useQuery("departments", getAllDepartments);

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
      <h1 className="text-3xl font-semibold text-secondary">Departments</h1>
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
                Description
              </th>

              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {departments.result.map((department) => (
              <tr
                className="bg-white border-b light:bg-gray-200 light:border-gray-200"
                key={department.department_id}
              >
                <td className="py-4 px-6">{department.name}</td>
                <td className="py-4 px-6">{department.description}</td>

                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Department;
