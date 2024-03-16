// libs
import { useState } from "react";
import { useMutation } from "react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

// Icons
import { IoSearch } from "react-icons/io5";

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
  const navigate = useNavigate();

  const mutation = useMutation(createTask, {
    onSuccess: () => {
      navigate("/project");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      project_id: 1,
      task_title: taskTitle,
      task_description: taskDescription,
      employee_id: secureLocalStorage.getItem("user").employee_id,
      start_date,
      end_date,
      status: "active",
    });
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
          <form onSubmit={handleSubmit}>
            <div className="grid p-2 grid-cols-1 gap-6 mb-6">
              {/** Input fields are encapsulated within their individual div for layout */}
              <div className="flex items-center gap-4">
                <select
                  name="project_name"
                  id="project_name"
                  className=" px-6 py-4 rounded-md border border-gray-500 "
                >
                  <option value="project_name">Project Name</option>
                  <option value="project_name">Project Name</option>
                  <option value="project_name">Project Name</option>
                </select>
                <div className="w-full flex items-center gap-2 px-4 py-4 rounded-md border border-gray-500">
                  <IoSearch className="text-gray-500 h-6 w-6" />
                  <input
                    type="text"
                    placeholder="Enter Employee Names to select"
                    className="border-none bg-transparent outline-none p-0 w-full"
                  />
                </div>
              </div>
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
