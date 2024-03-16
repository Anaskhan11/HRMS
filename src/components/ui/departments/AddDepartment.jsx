import { useState } from "react";
import { useMutation } from "react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// create User & Employee function
const createUser = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASE_URL}/api/department/createDepartment`,
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
  toast.success(`Department Created Successfully`, {
    style: {
      background: "#555",
      color: "#ffffff",
    },
  });
  return response.json();
};

const AddDepartment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      navigate("/department");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      name,
      description,
    });
  };
  return (
    <section className="p-4 md:p-8">
      <h1 className="text-3xl md:text-3xl font-semibold text-secondary">
        Add A Department
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
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="w-full h-60 mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  id="description"
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              disabled={mutation.isLoading}
              className="w-fit px-4 py-3 mt-6 text-white bg-primary rounded-lg"
              type="submit"
            >
              Create Department
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

export default AddDepartment;
