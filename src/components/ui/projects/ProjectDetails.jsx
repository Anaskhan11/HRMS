import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import axiosInstance from "../../../api/axios";
import { Modal } from "../common/Model";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

// Icons
import { FaRegCalendarMinus } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa";

const ProjectDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { id } = useParams();

  const searchEmployee = async (data) => {
    const response = await axiosInstance.post(
      "/api/project/searchByName",
      data
    );
    return response.data;
  };

  const handleSearchEmployee = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      department: department,
      position: position,
    };
    const response = await searchEmployee(data);
    setSearchResult(response.data);
    console.log("searchEmployee response: ", response);
    const mutation = useMutation(searchEmployee);
  };

  const getProject = async () => {
    const response = await axiosInstance.get(
      `/api/project/getProjectById/${id}`
    );
    return response.data;
  };

  const {
    data: project,
    isLoading,
    error,
    isError,
  } = useQuery("project", getProject);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
    <>
      <section className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-secondary mb-4">
            Project Details
          </h1>
          <button
            onClick={toggleModal}
            className="bg-primary text-white px-4 py-3 rounded-md"
          >
            Assign Project
          </button>
        </div>

        <div className="p-4 rounded-md bg-white my-6 w-fit shadow shadow-sm shadow-gray-400">
          <h1 className="text-3xl font-semibold text-primary mb-4">
            {project.data[0].project_name}
          </h1>
          <p className="text-lg font-light text-slate-500 mb-4">
            {project.data[0].project_description.toLowerCase()}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold text-slate-500 mb-4 flex items-center gap-1">
              <FaRegCalendarMinus className="text-green-500" />
              {project.data[0].start_date}
            </p>

            <p className="text-lg font-semibold text-slate-500 mb-4 flex items-center gap-1">
              <FaRegCalendarPlus className="text-red-500" />
              {project.data[0].end_date}
            </p>
          </div>
          <p
            className="text-lg font-semibold text-slate-500 mb-4 p-2 rounded-md bg-slate-100 w-max shadow shadow-gray-500 shadow-sm"
            style={{
              color: project.data[0].status === "active" ? "green" : "red",
            }}
          >
            {project.data[0].status}
          </p>
        </div>
      </section>
      <Modal isOpen={isModalOpen} close={toggleModal}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          <div className="border border-slate-500 rounded-md p-4">
            <input
              type="text"
              placeholder="employee name"
              className="border-none outline-none px-0 py-0 w-full bg-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="border border-slate-500 rounded-md p-4">
            <input
              type="text"
              placeholder="Department Name"
              className="border-none outline-none px-0 py-0 w-full bg-transparent"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <select
            name="position"
            id="position"
            className="px-4 py-4 rounded-md border border-slate-500 outline-none w-full"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="position">Position</option>
            <option value="position">Position</option>
            <option value="position">Position</option>
          </select>

          <button
            onClick={handleSearchEmployee}
            className="bg-primary text-white px-4 py-3 rounded-md"
          >
            Search Employees
          </button>
        </div>
        <div className="overflow-auto max-h-80">
          {searchResult.map((employee) => (
            <div className="flex items-center justify-between p-4 border border-slate-500 rounded-md my-4">
              <div>
                <h1 className="text-lg font-semibold text-primary">
                  {employee.name}
                </h1>
                <p className="text-md font-light text-slate-500">
                  {employee.department_name}
                </p>
              </div>
              <button
                onClick={() => {
                  toast.success("Employee Assigned Successfully");
                  toggleModal();
                }}
                className="bg-primary text-white px-4 py-3 rounded-md"
              >
                Assign
              </button>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ProjectDetails;
