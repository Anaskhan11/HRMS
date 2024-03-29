import React, { useState } from "react";
import { useMutation } from "react-query";
import Searchbars from "../common/Searchbars";
import axiosInstance from "../../../api/axios";
import SingleEmployee from "./SingleEmployee";

const Addpayroll = () => {
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [positionValues, setPositionValues] = useState([]);
  const [employee, setEmployee] = useState("");
  const [name, setName] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const searchEmployee = async () => {
    const response = await axiosInstance.get(
      `/api/employee/searchEmployee/${name}`
    );
    return response.data;
  };

  const SearchMutation = useMutation(searchEmployee);

  const handleSearchEmployee = async (e) => {
    e.preventDefault();
    const data = {
      name,
      department,
      position,
    };
    console.log(data, "data");

    SearchMutation.mutate(data, {
      onSuccess: (data) => {
        setSearchResult(data.result);
      },
      onError: (error) => {
        console.log("error: ", error);
      },
    });
  };

  return (
    <section className="p-4">
      <h1 className="text-3xl font-semibold text-secondary">
        Add Payroll Details
      </h1>

      <Searchbars
        department={department}
        position={position}
        name={name}
        setName={setName}
        setPosition={setPosition}
        setDepartment={setDepartment}
        positionValues={positionValues}
        handleSearchEmployee={handleSearchEmployee}
      />
      <div>
        {searchResult.length > 0 ? (
          <div style={{ flex: 1, overflowX: "auto" }}>
            <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
              <thead className="text-base font-bold uppercase text-gray-700 h-8">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Image
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Employee name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Employee email
                  </th>

                  <th scope="col" className="py-3 px-6">
                    Department
                  </th>

                  <th scope="col" className="py-3 px-6">
                    Position
                  </th>

                  <th scope="col" className="py-3 px-6">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {searchResult.length > 0 &&
                  searchResult.map((employee) => (
                    <SingleEmployee
                      employee={employee}
                      key={employee.employee_id}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Addpayroll;
