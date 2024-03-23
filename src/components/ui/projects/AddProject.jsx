// libs
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormStateForProject from "../common/FormStatesForProject";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "../../../api/axios";

// Icons

import Searchbars from "../common/Searchbars";
import { MdCancel } from "react-icons/md";

// create User & Employee function
const createProject = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASE_URL}/api/project/createProject`,
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
  toast.success(`Project Created Successfully`, {
    style: {
      background: "#555",
      color: "#ffffff",
    },
  });
  return response.json();
};

const AddProject = () => {
  // Project Data
  const [project_name, setProjectName] = useState("");
  const [project_description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  // Assignment Data

  const [currentStage, setCurrentStage] = useState(0);
  const [assignedEmployees, setAssignedEmployees] = useState([]);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectPositionValues, setSelectPositionValues] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllPositions = async () => {
      const response = await axiosInstance.get("/api/position/getAllPositions");
      if (response.data) {
        setSelectPositionValues(response.data.data);
      }
    };
    getAllPositions();
  }, []);

  const searchEmployee = async (data) => {
    const response = await axiosInstance.post(
      "/api/project/searchByName",
      data
    );
    return response.data;
  };

  const Searchmutation = useMutation(searchEmployee);

  const handleSearchEmployee = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      department: department,
      position: position,
    };

    Searchmutation.mutate(data, {
      onSuccess: (data) => {
        setSearchResult(data.data);
      },
      onError: (error) => {
        console.log("error: ", error);
      },
    });
  };

  const handleAssignProject = (employee) => {
    // Check if the employee is already assigned
    const isAlreadyAssigned = assignedEmployees.some(
      (assignedEmployee) =>
        assignedEmployee.employee_id === employee.employee_id
    );

    if (isAlreadyAssigned) {
      toast.warning("This employee is already assigned to the project.");
    } else {
      setAssignedEmployees((prevEmployees) => [...prevEmployees, employee]);
    }
  };

  const mutation = useMutation(createProject, {
    onSuccess: () => {
      toast.success("Project created & assigned successfully");
      navigate("/project");
    },
    onError: () => {
      toast.error("Project creation & assignment failed!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!project_name || !project_description || !start_date || !end_date) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (assignedEmployees.length === 0) {
      toast.error(
        "Please assign at least one employee to the project before submission."
      );
      return;
    }

    const employeeIds = assignedEmployees.map(
      (employee) => employee.employee_id
    );
    const roles = assignedEmployees.map((employee) => employee.title);

    mutation.mutate({
      project_name,
      project_description,
      start_date,
      end_date,
      status: "active",
      manager_id: secureLocalStorage.getItem("user").employee_id,
      employee_ids: employeeIds,
      role: position,
    });
  };

  return (
    <section className="p-4 md:p-8">
      <h1 className="text-3xl md:text-3xl font-semibold text-secondary">
        Add A New Project
      </h1>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-6 rounded-lg"
      >
        <div className="p-6 md:p-8 shadow shadow-sm rounded-md shadow-gray-400 bg-slate-50">
          <FormStateForProject
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
          />
          <form onSubmit={currentStage === 2 ? handleSubmit : undefined}>
            <div className="grid p-2 grid-cols-1 gap-6 mb-6">
              {/** Input fields are encapsulated within their individual div for layout */}
              {currentStage === 0 && (
                <>
                  <div>
                    <label className="text-gray-600 font-medium" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="w-full shadow shadow-sm mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      id="name"
                      name="name"
                      type="text"
                      value={project_name}
                      onChange={(e) => setProjectName(e.target.value)}
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
                      value={project_description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              {currentStage === 1 && (
                <>
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
                </>
              )}
              {currentStage === 2 && (
                <>
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

                  <div className="my-4">
                    <h2 className="text-lg font-semibold mb-2">
                      Assigned Employees:
                    </h2>
                    <div className="w-full flex items-center flex-wrap gap-2">
                      {assignedEmployees.map((employee) => (
                        <span
                          key={employee.employee_id}
                          className="w-fit flex items-center justify-between p-2 border border-slate-500 rounded-md mb-2"
                        >
                          <p className="text-md font-light">{employee.name}</p>
                          <MdCancel
                            className="text-red-500 cursor-pointer h-6 w-6"
                            onClick={() => {
                              setAssignedEmployees((prevEmployees) =>
                                prevEmployees.filter(
                                  (emp) =>
                                    emp.employee_id !== employee.employee_id
                                )
                              );
                            }}
                          />
                        </span>
                      ))}
                    </div>
                  </div>

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
                          type="button"
                          onClick={() => handleAssignProject(employee)}
                          className="bg-primary text-white px-4 py-3 rounded-md"
                        >
                          Assign
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {currentStage === 2 && (
                <button
                  className="w-fit px-4 py-3 mt-6 text-white bg-primary rounded-lg"
                  type="submit"
                >
                  Create Project
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default AddProject;
