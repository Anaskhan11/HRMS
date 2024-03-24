// libs
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Modal } from "../common/Model";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/axios";
import Searchbars from "../common/Searchbars";
import ToggleSwitch from "./ToggleSwitch";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Icons
import { FaRegUser } from "react-icons/fa";
import { FaRegCalendarAlt, FaRegListAlt } from "react-icons/fa";
import ModernCalendar from "../common/ModernCalendar";

const ProjectDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectPositionValues, setSelectPositionValues] = useState([]);
  const { id } = useParams();

  const queryClient = useQueryClient();

  const updateTaskStatus = async ({ taskId, newStatus }) => {
    const response = await axiosInstance.put(
      `/api/project/${taskId}/updateTaskStatus`,
      {
        status: newStatus,
      }
    );

    toast.success("Task status updated successfully");
    return response.data;
  };

  const StatusMutation = useMutation(updateTaskStatus, {
    onSuccess: () => {
      // This line tells React Query to invalidate and refetch 'tasks' query
      queryClient.invalidateQueries("tasks");
    },
    onError: (error) => {
      // Handle error
      console.error("Failed to update task status", error);
    },
  });

  const handleStatusChange = (taskId, newStatus) => {
    StatusMutation.mutate({ taskId, newStatus });
  };

  const getAllTasks = async () => {
    const response = await axiosInstance.get(
      `/api/project/getProjectTasks/${id}`
    );
    return response.data;
  };

  const searchEmployee = async (data) => {
    const response = await axiosInstance.post(
      "/api/project/searchByName",
      data
    );
    return response.data;
  };

  const { data } = useQuery("tasks", getAllTasks);

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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-secondary mb-4">
            Project Details
          </h1>
          <button
            onClick={toggleModal}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            Assign Employees
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-2 p-4 rounded-md bg-white my-6 shadow shadow-sm shadow-gray-400">
          <div>
            <h1 className="text-2xl font-semibold text-primary">
              {project && project.data[0].project_name}
            </h1>
            <span className="flex items-center justify-start">
              <p
                className="text-lg font-semibold text-slate-500 mb-2 "
                style={{
                  color: project.data[0].status === "active" ? "green" : "red",
                }}
              >
                {project.data[0].status}
              </p>
            </span>
            <p className="text-lg font-light text-slate-500 mb-4 w-[350px]">
              {project.data[0].project_description.toLowerCase()}
            </p>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold mb-4">Employees</h1>
              <ul className="flex items-center flex-wrap overlap-children mb-4">
                {project.data.map((employee, index) => (
                  <span
                    key={employee.assignment_id}
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
              <ModernCalendar
                startDate={project.data[0].start_date}
                endDate={project.data[0].end_date}
              />
            </div>
          </div>

          <div className="flex-1 w-full">
            <h1 className="text-2xl font-semibold mb-4">Tasks</h1>

            {data &&
              data.result.map((task) => (
                <div
                  key={task.task_id}
                  className="mb-5 p-4 rounded-lg bg-white hover:bg-gray-100 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-md cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold flex items-center space-x-2 mb-2">
                        <FaRegListAlt className="text-primary" />
                        <span>{task.task_title}</span>
                      </h3>
                      <p className="text-gray-600">{task.task_description}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <FaRegCalendarAlt className="mr-2" />{" "}
                          {task.start_date} - {task.end_date}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        task.status === "active"
                          ? "bg-blue-500"
                          : task.status === "completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="flex-shrink-0">
                      {task.image ? (
                        <img
                          src={`${import.meta.env.VITE_APP_BASE_URL}/${
                            task.image
                          }`}
                          alt={task.name}
                          className="h-12 w-12 rounded-full object-cover mr-4"
                        />
                      ) : (
                        <FaRegUser className="mr-4 bg-gray-200 text-primary h-12 w-12 p-2 rounded-full" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {task.name}
                      </h2>
                      <p className="text-gray-600">{task.email}</p>
                    </div>
                  </div>
                  <ToggleSwitch
                    initialState={task.status}
                    taskId={task.task_id}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              ))}
            {data.result.length === 0 && (
              <p className="text-lg font-semibold text-slate-500">
                No tasks available
              </p>
            )}
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
