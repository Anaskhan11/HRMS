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
        {/*All the employee you want to assign the project to goes below*/}
        <div className="p-2 my-2 flex items-center flex-wrap gap-1 max-w-md">
          {[...new Set(employees)].map((employee) => (
            <div
              key={employee}
              className="flex items-center gap-1 bg-slate-50 p-2 rounded-md shadow shadow-sm shadow-slate-300"
            >
              <span>{employee}</span>
              <MdCancel
                className="h-6 w-6 cursor-pointer hover:scale-110 transition-all"
                onClick={() => {
                  setEmployees((prevEmployees) =>
                    prevEmployees.filter((emp) => emp !== employee)
                  );
                }}
              />
            </div>
          ))}
        </div>
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
                onClick={() => {
                  if (employees.includes(employee.name)) {
                    toast.warning("Employee already added", {
                      backgroundColor: "yellow",
                    });
                  } else {
                    toast.success("Employee Assigned Successfully");
                    setEmployees((prev) => [...prev, employee.name]);
                  }
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
