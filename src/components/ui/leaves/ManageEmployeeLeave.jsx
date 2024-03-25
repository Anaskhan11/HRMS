//libs
import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

// Icons
import { TiChevronRight } from "react-icons/ti";

const ManageEmployeeLeave = ({ leave_id, initialState, refetchLeaves }) => {
  const [leave, setLeave] = useState("");

  const handleLeave = async (data) => {
    if (leave === "" && initialState === "isPending")
      return alert("Please select leave first");

    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/api/leave/updateLeaves`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      toast.success(`Leave Operation Successful`);
    }
    if (!response.ok) {
      toast.error(`Something went wrong while processing your request`);
    }
  };

  const mutation = useMutation(handleLeave);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(
      {
        id: leave_id,
        status: leave,
      },
      {
        onSuccess: () => {
          refetchLeaves();
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-1">
      <select
        name="leave"
        className={`active:bg-none selected:bg-none bg-gray-200 p-2 rounded-md ${
          leave === "Accepted" && "bg-green-500 text-white"
        } ${leave === "Rejected" && "bg-red-500 text-white"} ${
          leave === "Under Review" && "bg-yellow-500 text-white"
        }`}
        id="leave"
        value={leave}
        onChange={(e) => setLeave(e.target.value)}
        disabled={initialState !== "isPending"}
        required
      >
        <option className="bg-white text-black" selected>
          Mark Leave
        </option>
        <option className="bg-white text-black" value="Accepted">
          Accepted
        </option>
        <option className="bg-white text-black" value="Rejected">
          Rejected
        </option>
        <option className="bg-white text-black" value="Under Review">
          Under Review
        </option>
      </select>
      <button
        onClick={handleSubmit}
        className={`bg-primary px-3 py-2 rounded-md flex items-center gap-1 text-white ${
          initialState !== "isPending" ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={initialState !== "isPending"}
      >
        <TiChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ManageEmployeeLeave;
