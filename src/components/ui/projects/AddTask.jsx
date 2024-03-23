// libs
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axios";
import secureLocalStorage from "react-secure-storage";

// Icons
import { IoSearch } from "react-icons/io5";
import { IoPersonAdd } from "react-icons/io5";

// get all projects
const getAllProjects = async () => {
  const response = await axiosInstance.get(
    `/api/project/getProjectsByManagerId/${
      secureLocalStorage.getItem("user").employee_id
    }`
  );
  return response.data;
};

// create User & Employee function
const createTask = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASE_URL}/api/project/createTask`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  toast.success(`Task Created Successfully`, {
    style: {
      background: "#555",
      color: "#ffffff",
    },
  });
  return response.json();
};

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [projectId, setProjectId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate();

  // const handleAssignEmployee function
  const handleAssignEmployee = (employee_id) => {
    setEmployeeId(employee_id);
  };
  // Search Employee function
  const searchEmployee = async () => {
    const response = await axiosInstance.post(
      `/api/project/searchEmployeesInAssignment/${projectId}/${searchTerm}`
    );
    return response.data;
  };

  const { data } = useQuery("projects", getAllProjects);

  const mutation = useMutation(createTask, {
    onSuccess: () => {
      navigate("/project");
    },
  });

  const searchMutation = useMutation(searchEmployee);

  const handleEmployeeSearch = (e) => {
    e.preventDefault();
    searchMutation.mutate(
      {
        project_id: projectId,
        searchTerm,
      },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log("error: ", error);
        },
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(
      {
        project_id: 1,
        task_title: taskTitle,
        task_description: taskDescription,
        employee_id: employeeId,
        start_date,
        end_date,
        status: "active",
      },
      {
        onSuccess: () => {
          toast.success(
            `Task Assigned to employee with employee_id ${employeeId} Successfully`
          );
        },
        onError: () => {
          toast.error("Error assigning the task.");
        },
      }
    );
  };

  return (
    <section className="p-4 md:p-8">
      <h1 className="text-3xl md:text-3xl font-semibold text-secondary">
        Add A New New Task
      </h1>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-6 rounded-lg"
      >
        <div className="p-6 md:p-8 shadow shadow-sm rounded-md shadow-gray-400 bg-slate-50">
          <form
            onSubmit={handleEmployeeSearch}
            className="flex items-center gap-4"
          >
            <select
              name="project_name"
              id="project_name"
              className=" px-6 py-4 rounded-md border border-gray-500"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <option value="">Select Project</option>
              {data &&
                data.data.map((project) => (
                  <option value={project.project_id} key={project.project_id}>
                    {project.project_name}
                  </option>
                ))}
            </select>
            <div className="w-full flex items-center gap-2 px-4 py-4 rounded-md border border-gray-500">
              <IoSearch className="text-gray-500 h-6 w-6" />
              <input
                type="text"
                placeholder="Enter Employee Names to select"
                className="border-none bg-transparent outline-none p-0 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          <div className="flex flex-wrap gap-4">
            {searchMutation.isLoading && <p>Loading...</p>}
            {searchMutation.isSuccess && (
              <div className="w-full">
                <h2 className="text-lg font-semibold text-gray-600 my-2">
                  Search Results
                </h2>
                <div className="grid grid-cols-1 gap-4 mt-4 max-h-[300px] overflow-y-auto">
                  {searchMutation.data.result.map((employee) => (
                    <div className="flex items-center justify-between p-4 bg-white rounded-md shadow shadow-sm">
                      <div key={employee.employee_id} className="">
                        <h3 className="text-lg font-semibold text-gray-600">
                          {employee.name}
                        </h3>
                        <p className="text-gray-500">{employee.email}</p>
                      </div>
                      <span
                        className="px-2 py-2 flex items-center gap-1 text-white rounded-md bg-primary cursor-pointer hover:text-white hover:bg-black transition-all"
                        onClick={() =>
                          handleAssignEmployee(employee.employee_id)
                        }
                      >
                        <IoPersonAdd className="text-white h-6 w-6" />
                        <p>Assign Task </p>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid p-2 grid-cols-1 gap-6 mb-6">
              {/** Input fields are encapsulated within their individual div for layout */}

              <div>
                <label className="text-gray-600 font-medium" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full shadow shadow-sm mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  id="name"
                  name="name"
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  className="text-gray-600 font-medium"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="w-full h-60 mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  id="description"
                  name="description"
                  type="text"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <label
                    className="text-gray-600 font-medium"
                    htmlFor="start_date"
                  >
                    Start Date
                  </label>
                  <input
                    className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    className="text-gray-600 font-medium"
                    htmlFor="end_date"
                  >
                    End Date
                  </label>
                  <input
                    className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={end_date}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <button
              disabled={mutation.isLoading}
              className="w-fit px-4 py-3 mt-6 text-white bg-primary rounded-lg"
              type="submit"
            >
              Create Project
            </button>
          </form>
          {mutation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {mutation.isLoading && <p>Loading...</p>}
              {mutation.isSuccess && (
                <p className="success">Department created successfully!</p>
              )}
              {mutation.isError && (
                <p className="error">Error: {mutation.error.message}</p>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default AddTask;
