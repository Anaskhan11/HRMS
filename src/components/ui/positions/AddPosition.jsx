import { useState } from "react";
import { useMutation } from "react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// create User & Employee function
const createUser = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASE_URL}/api/position/createPosition`,
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

  toast.success(`Position Created Successfully`, {
    style: {
      background: "#555",
      color: "#ffffff",
    },
  });

  return response.json();
};

const AddPosition = () => {
  const [title, setTitle] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  const mutation = useMutation(createUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title,
      responsibilities,
    });
  };
  return (
    <section className="p-4 md:p-8">
      <h1 className="text-3xl md:text-3xl font-semibold text-secondary">
        Add A Position
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
                <label className="text-gray-600 font-medium" htmlFor="title">
                  Title
                </label>
                <input
                  className="w-full shadow shadow-sm mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  className="text-gray-600 font-medium"
                  htmlFor="responsibilities"
                >
                  Responsibilities
                </label>
                <textarea
                  className="w-full h-60 mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  id="responsibilities"
                  name="responsibilities"
                  type="text"
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              disabled={mutation.isLoading}
              className="w-fit px-4 py-3 mt-6 text-white bg-primary rounded-lg"
              type="submit"
            >
              Create Position
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
                <p className="success">Position created successfully!</p>
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

export default AddPosition;
