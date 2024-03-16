// libs
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import axiosInstance from "../../../api/axios";
import secureLocalStorage from "react-secure-storage";

const requestLeave = async (data) => {
  try {
    const response = await axiosInstance.post("/api/leave/createLeave", data);

    toast.success(`Application Submitted Successfully`, {
      style: {
        background: "#555",
        color: "#ffffff",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to submit application. Please try again.");
  }
};

const RequestLeave = () => {
  const [employeeId, setEmployeeId] = useState(null);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const employee_id = secureLocalStorage.getItem("user").employee_id;
    if (employee_id) {
      setEmployeeId(employee_id);
    }
  }, []);

  const mutation = useMutation(requestLeave);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      "employeeId, startDate, endDate, leaveType",
      employeeId,
      startDate,
      endDate,
      leaveType
    );

    mutation.mutate({
      employee_id: employeeId,
      start_date: startDate.toString(),
      end_date: endDate.toString(),
      leave_type: leaveType,
    });
  };
  return (
    <section className="p-4 md:p-8">
      <h1 className="text-3xl md:text-3xl font-semibold text-secondary">
        Request a leave
      </h1>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-6 rounded-lg"
      >
        <div className="p-6 md:p-8 shadow shadow-sm rounded-md shadow-gray-400 bg-slate-50">
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label className="text-gray-600 font-medium" htmlFor="leave">
                  Leave Type
                </label>
                <textarea
                  className="w-full h-40 shadow shadow-sm mt-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  id="leave"
                  name="leave"
                  type="text"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div>
                  <label
                    className="text-gray-600 font-medium"
                    htmlFor="startDate"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="text-gray-600 font-medium"
                    htmlFor="endDate"
                  >
                    End Date
                  </label>

                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              disabled={mutation.isLoading}
              className="w-fit px-4 py-3 mt-6 text-white bg-yellow-400 rounded-lg"
              type="submit"
            >
              Submit Application
            </button>
          </form>
          {mutation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {mutation.isLoading && <p>Loading...</p>}

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

export default RequestLeave;
