// libs
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { Modal } from "../common/Model";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axios";
import Searchbars from "../common/Searchbars";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Icons
import { FaRegCalendarMinus } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

const ProjectDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectPositionValues, setSelectPositionValues] = useState([]);
  const [employees, setEmployees] = useState([]);
  const { id } = useParams();

  const searchEmployee = async (data) => {
    const response = await axiosInstance.post(
      "/api/project/searchByName",
      data
    );
    return response.data;
  };

  const mutation = useMutation(searchEmployee);

  const handleSearchEmployee = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      department: department,
      position: position,
    };

    mutation.mutate(data, {
      onSuccess: (data) => {
        setSearchResult(data.data);
      },
      onError: (error) => {
        console.log("error: ", error);
      },
    });
  };

  const getProject = async () => {
    const response = await axiosInstance.get(
      `/api/project/getProjectById/${id}`
    );
    console.log("project data", response.data);
    return response.data;
  };

  // useEffect hook to get all the positions

  useEffect(() => {
    const getAllPositions = async () => {
      const response = await axiosInstance.get("/api/position/getAllPositions");
      if (response.data) {
        setSelectPositionValues(response.data.data);
      }
    };
    getAllPositions();
  }, []);

  const {
    data: project,
    isLoading,
    error,
    isError,
  } = useQuery("project", getProject);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAssignProject = async (employee) => {
    const data = {
      project_id: id,
      employee_id: employee.employee_id,
      role: employee.title,
    };

    const response = await axiosInstance.post(
      "/api/project/createAssignment",
      data
    );

    console.log("assignment result", response.data);

    if (response.status === 200) {
      toast.success("Project assigned successfully");
    }
    if (response.status !== 200) {
      toast.error("Project assigned failed");
    }
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
        <h1 className="text-3xl font-semibold text-secondary mb-4">
          Project Details
        </h1>

        <div className="p-4 rounded-md bg-white my-6 w-fit shadow shadow-sm shadow-gray-400">
          <div className="flex items-center justify-between my-2">
            <h1 className="text-3xl font-semibold text-primary">
              {project.data[0].project_name}
            </h1>
            <button
              onClick={toggleModal}
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Assign Employees
            </button>
          </div>

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
          <span className="flex items-center justify-end">
            <p
              className="text-lg font-semibold text-slate-500 mb-2 "
              style={{
                color: project.data[0].status === "active" ? "green" : "red",
              }}
            >
              {project.data[0].status}
            </p>
          </span>
          <div>
            <h1 className="text-2xl font-semibold mb-4">Employees</h1>
            <ul className="flex items-center flex-wrap overlap-children">
              {project.data.map((employee, index) => (
                <span
                  className=" h-12 w-12 flex items-center justify-center bg-slate-100 rounded-full shadow shadow-md shadow-slate-400"
                  style={{ marginLeft: index !== 0 ? "-10px" : undefined }}
                >
                  {employee.image ? (
                    <img
                      src={`${import.meta.env.VITE_APP_BASE_URL}/${
                        employee.image
                      }`}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <FaRegUser
                      className="text-primary h-8 w-8"
                      key={employee.employee_id}
                    />
                  )}
                </span>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Modal isOpen={isModalOpen} close={toggleModal}>
        <Searchbars
          name={name}
          department={department}
          position={position}
          setName={setName}
          setDepartment={setDepartment}
          setPosition={setPosition}
          handleSearchEmployee={handleSearchEmployee}
          positionValues={selectPositionValues}
        />

        {/* The result of the Above Searchbars component goes here */}
        <div className="overflow-auto max-h-80">
          {searchResult.map((employee) => (
            <div
              key={employee.employee_id}
              className="flex items-center justify-between p-4 border border-slate-500 rounded-md my-4"
            >
              <div>
                <h1 className="text-lg font-semibold text-primary">
                  {employee.name}
                </h1>
                <p className="text-md font-light text-slate-500">
                  {employee.department_name}
                </p>
                <p className="text-md font-light text-slate-500">
                  {employee.title}
                </p>
              </div>
              <button
                onClick={() => handleAssignProject(employee)}
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
