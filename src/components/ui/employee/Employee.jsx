//Libs

import { useQuery } from "react-query";
import { useEffect } from "react";

const Employee = () => {
  // /api/employee/getAllEmployees

  const getAllEmployees = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/api/employee/getAllEmployees`
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };

  const {
    data: employees,
    isLoading,
    error,
    isError,
  } = useQuery("employees", getAllEmployees);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  console.log(employees.result);

  return (
    <section className="p-4">
      <h1 className="text-xl font-semibold text-[#7054f6]">Employee</h1>
      <div className="my-6 overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-[#7054f6]">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Role
              </th>
              <th scope="col" className="py-3 px-6">
                Father Name
              </th>
              <th scope="col" className="py-3 px-6">
                Gender
              </th>
              <th scope="col" className="py-3 px-6">
                Religion
              </th>

              <th scope="col" className="py-3 px-6">
                Address
              </th>
              <th scope="col" className="py-3 px-6">
                Phone Number
              </th>
              <th scope="col" className="py-3 px-6">
                Emergency Contact
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.result.map((employee) => (
              <tr
                className="bg-white border-b light:bg-gray-200 light:border-gray-200"
                key={employee.employee_id}
              >
                <td className="py-4 px-6">{employee.name}</td>
                <td className="py-4 px-6">{employee.email}</td>
                <td className="py-4 px-6">{employee.role}</td>
                <td className="py-4 px-6">{employee.father_name}</td>
                <td className="py-4 px-6">{employee.gender}</td>
                <td className="py-4 px-6">{employee.religion}</td>
                <td className="py-4 px-6">{employee.address}</td>
                <td className="py-4 px-6">{employee.phone_number}</td>
                <td className="py-4 px-6">{employee.emergency_contact}</td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Employee;
