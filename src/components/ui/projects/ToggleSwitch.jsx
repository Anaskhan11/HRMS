import React, { useState } from "react";

const ToggleSwitch = ({ initialState, taskId, onStatusChange }) => {
  const [status, setStatus] = useState(initialState); // "Active", "Inactive", or "OnHold"
  console.log("Initial state", initialState);
  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
    onStatusChange(taskId, newStatus);
  };

  return (
    <div className="toggle-switch">
      <button
        className={`toggle-option ${status === "active" ? "active" : ""}`}
        onClick={() => handleChangeStatus("active")}
      >
        Active
      </button>
      <button
        className={`toggle-option ${status === "inactive" ? "inactive" : ""}`}
        onClick={() => handleChangeStatus("inactive")}
      >
        Inactive
      </button>
      <button
        className={`toggle-option ${status === "completed" ? "completed" : ""}`}
        onClick={() => handleChangeStatus("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default ToggleSwitch;
