//libs
import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

// Icons
import { TiChevronRight } from "react-icons/ti";

const SingleUserAttendance = ({ employee_id }) => {
  const [attendance, setAttendance] = useState("");
  console.log(employee_id, "employee");

  const handleAttendance = async (data) => {
    if (attendance === "") return alert("Please select attendance first");

    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/api/attendance/createAttendance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      toast.success(`Attendance Marked`);
    }
    if (!response.ok) {
      toast.error(`Failed to mark attendance`);
    }
  };

  const mutation = useMutation(handleAttendance);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      employee_id,
      status: attendance,
      date: new Date().toLocaleDateString(),
      time_in: new Date().toLocaleTimeString(),
      time_out: new Date().toLocaleTimeString(),
    });
  };

  return (
    <div className="flex items-center gap-1">
      <select
        name="attendance"
        className={`active:bg-none selected:bg-none bg-gray-200 p-2 rounded-md ${
          attendance === "present" && "bg-green-500 text-white"
        } ${attendance === "absent" && "bg-red-500 text-white"} ${
          attendance === "leave" && "bg-yellow-500 text-white"
        }`}
        id="attendance"
        value={attendance}
        onChange={(e) => setAttendance(e.target.value)}
        required
      >
        <option className="bg-white text-black" value="" disabled>
          Mark Attendance
        </option>
        <option className="bg-white text-black" value="present">
          Present
        </option>
        <option className="bg-white text-black" value="absent">
          Absent
        </option>
        <option className="bg-white text-black" value="leave">
          Leave
        </option>
      </select>
      <button
        onClick={handleSubmit}
        className="bg-primary px-3 py-2 rounded-md flex items-center gap-1 text-white"
      >
        <TiChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SingleUserAttendance;
