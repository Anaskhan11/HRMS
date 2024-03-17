import React from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../api/axios";

const Searchbars = ({
  name,
  department,
  position,
  setName,
  setDepartment,
  setPosition,
  positionValues,
  handleSearchEmployee,
}) => {
  const getAllPositions = async () => {
    const response = await axiosInstance.get("/api/position/getAllPositions");
    return response.data;
  };

  const { data, isLoading, error } = useQuery("positions", getAllPositions);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data) {
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
      <div className="border border-slate-500 rounded-md p-4">
        <input
          type="text"
          placeholder="employee name"
          className="border-none outline-none px-0 py-0 w-full bg-transparent"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="border border-slate-500 rounded-md p-4">
        <input
          type="text"
          placeholder="Department Name"
          className="border-none outline-none px-0 py-0 w-full bg-transparent"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>

      <select
        name="position"
        id="position"
        className="px-4 py-4 rounded-md border border-slate-500 outline-none w-full"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      >
        <option value="">Select Position</option>
        {positionValues.map((position) => (
          <option key={position.position_id} value={position.title}>
            {position.title}
          </option>
        ))}
      </select>

      <button
        onClick={handleSearchEmployee}
        className="bg-primary text-white px-4 py-3 rounded-md"
      >
        Search Employees
      </button>
    </div>
  );
};

export default Searchbars;
