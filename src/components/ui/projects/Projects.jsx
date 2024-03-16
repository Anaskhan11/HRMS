// Libs
import React from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../api/axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Icons
import { TbEdit } from "react-icons/tb";

const Projects = () => {
  const getAllProjects = async () => {
    const response = await axiosInstance.get("/api/project/getProjects");
    console.log("projects", response.data);
    return response.data;
  };

  const {
    data: employees,
    isLoading,
    error,
    isError,
  } = useQuery("projects", getAllProjects);

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
      <h1 className="text-xl font-semibold text-primary">Projects</h1>
      <div className="my-6 overflow-x-auto rounded-md table-scroll">
        {/* Wrap the table in a div with the class "table-scroll" */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {/* Table contents */}

          <thead className="text-xs text-white uppercase bg-primary h-8">
            <tr>
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
                Address
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
            {projects.result.map((employee) => (
              <tr
                className="bg-white border-b light:bg-gray-200 light:border-gray-200"
                key={employee.employee_id}
              >
                <td className="py-4 px-6">{employee.name}</td>
                <td className="py-4 px-6">{employee.email}</td>
                <td className="py-4 px-6">{employee.role}</td>
                <td className="py-4 px-6">{employee.father_name}</td>
                <td className="py-4 px-6">{employee.gender}</td>
                <td className="py-4 px-6">{employee.religion}</td>
                <td className="py-4 px-6">{employee.address}</td>
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
    </section>
  );
};

export default Projects;
