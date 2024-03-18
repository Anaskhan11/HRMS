// libs
import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormStates from "../common/FormStates";
import axiosInstance from "../../../api/axios";

const createUser = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/employee/createEmployee",
      data
    );

    toast.success(`Employee Created Successfully`, {
      style: {
        background: "#555",
        color: "#ffffff",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [religion, setReligion] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [departments, setDepartments] = useState([]);
  const [department_id, setDepartmentId] = useState("");
  const [positions, setPositions] = useState([]);
  const [position_id, setPositionId] = useState("");
  const [activeState, setActiveState] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllDepartments = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/department/getAllDepartment"
        );
        setDepartments(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    const getAllPositions = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/position/getAllPositions"
        );
        setPositions(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllDepartments();
    getAllPositions();
  }, []);

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      navigate("/employee");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      name,
      email,
      password,
      role,
      fatherName,
      gender,
      address,
      date_of_birth,
      religion,
      phoneNumber,
      emergencyContact,
      department_id,
      position_id
    );
    mutation.mutate({
      name,
      email,
      password,
      role,
      fatherName,
      gender,
      address,
      date_of_birth,
      religion,
      phoneNumber,
      emergencyContact,
      department_id,
      position_id,
    });
  };
  return (
    <section className="p-4 md:p-8">
      <h1 className="text-3xl md:text-3xl font-semibold text-secondary">
        Add An Employee
      </h1>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-6 rounded-lg"
      >
        <div className="p-6 md:p-8 shadow shadow-sm rounded-md shadow-gray-400 bg-slate-50">
          <FormStates
            activeState={activeState}
            setActiveState={setActiveState}
          />
          <form onSubmit={handleSubmit}>
            {activeState === 0 && (
              <h1 className="text-xl md:text-3xl font-bold text-primary">
                Personal Information
              </h1>
            )}
            <div className="grid p-2 grid-cols-1 md:grid-cols-2 gap-6 mb-6 ">
              {/** Input fields are encapsulated within their individual div for layout */}
              {activeState === 0 && (
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-600 font-medium"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-600 font-medium"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium" htmlFor="role">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full mt-1 px-4 py-2 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                </>
              )}

              {activeState === 1 && (
                <>
                  <div>
                    <label
                      className="text-gray-700 font-medium"
                      htmlFor="fatherName"
                    >
                      Father's Name
                    </label>
                    <input
                      className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      type="text"
                      id="fatherName"
                      name="fatherName"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-700 font-medium"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full mt-1 px-4 py-2 border bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="text-gray-700 font-medium"
                      htmlFor="address"
                    >
                      Address
                    </label>
                    <input
                      className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      type="text"
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-700 font-medium"
                      htmlFor="date_of_birth"
                    >
                      Date of Birth
                    </label>
                    <input
                      className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      type="date"
                      id="date_of_birth"
                      name="date_of_birth"
                      value={date_of_birth}
                      onChange={(e) => setDate_of_birth(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-700 font-medium"
                      htmlFor="religion"
                    >
                      Religion
                    </label>
                    <input
                      className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      type="text"
                      id="religion"
                      name="religion"
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-700 font-medium"
                      htmlFor="phoneNumber"
                    >
                      Phone Number
                    </label>
                    <input
                      className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="text-gray-700 font-medium"
                      htmlFor="emergencyContact"
                    >
                      Emergency Contact
                    </label>
                    <input
                      className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      type="text"
                      id="emergencyContact"
                      name="emergencyContact"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      required
                    />
                  </div>{" "}
                </>
              )}
              {activeState === 2 && (
                <>
                  <div>
                    <label
                      className="text-gray-700 font-medium"
                      htmlFor="department"
                    >
                      Department
                    </label>
                    <select
                      name="department"
                      id="department"
                      className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={department_id}
                      onChange={(e) => setDepartmentId(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        {" "}
                        Select a Department
                      </option>
                      {departments.map((department) => (
                        <option
                          key={department.department_id}
                          value={department.department_id}
                        >
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      className="text-gray-700 font-medium"
                      htmlFor="position"
                    >
                      Position
                    </label>
                    <select
                      name="position"
                      id="position"
                      className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={position_id}
                      onChange={(e) => setPositionId(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        {" "}
                        Select a Position
                      </option>
                      {positions.map((position) => (
                        <option value={position.position_id}>
                          {position.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>

            {activeState === 2 && (
              <button
                disabled={mutation.isLoading}
                className="w-fit px-4 py-3 mt-6 text-white bg-yellow-400 rounded-lg"
                type="submit"
              >
                Create Employee
              </button>
            )}
          </form>
          {mutation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {mutation.isLoading && <p>Loading...</p>}
              {mutation.isSuccess && (
                <p className="success">User created successfully!</p>
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

export default AddEmployee;
