import { useState } from "react";
import { useMutation } from "react-query";
import { motion } from "framer-motion";

// create User & Employee function
const createUser = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASE_URL}/api/employee/createEmployee`,
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
  return response.json();
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

  const mutation = useMutation(createUser);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    });
  };
  return (
    <section className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-indigo-700">
        Add An Employee
      </h1>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-6 rounded-lg"
      >
        <div className="p-6 md:p-8 shadow shadow-sm rounded-md shadow-gray-400 card">
          <form onSubmit={handleSubmit}>
            <div className="grid p-2 grid-cols-1 md:grid-cols-2 gap-6 mb-6 ">
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-600 font-medium" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-700 font-medium" htmlFor="role">
                  Role
                </label>
                <input
                  className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  type="text"
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
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
                />
              </div>
              <div>
                <label className="text-gray-700 font-medium" htmlFor="gender">
                  Gender
                </label>
                <input
                  className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-700 font-medium" htmlFor="address">
                  Address
                </label>
                <input
                  className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                />
              </div>
              <div>
                <label className="text-gray-700 font-medium" htmlFor="religion">
                  Religion
                </label>
                <input
                  className="w-full mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  type="text"
                  id="religion"
                  name="religion"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
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
                />
              </div>
            </div>
            <button
              disabled={mutation.isLoading}
              className="w-fit px-4 py-3 mt-6 text-white bg-[#7054f6] rounded-lg"
              type="submit"
            >
              Create Employee
            </button>
          </form>
          {mutation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {mutation.isLoading && <p>Loading...</p>}
              {mutation.isSuccess && <p>User created successfully!</p>}
              {mutation.isError && <p>Error: {mutation.error.message}</p>}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default AddEmployee;
