import React from "react";
import axiosInstance from "../../../api/axios";
import secureLocalStorage from "react-secure-storage";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "../common/TableSkeleton";

const SalaryInformation = () => {
  const fetchPayroll = async () => {
    const response = await axiosInstance.get(
      `/api/payroll/getpayroll/${
        secureLocalStorage.getItem("user").employee_id
      }`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery("payroll", fetchPayroll);

  if (isLoading) {
    return (
      <section className="p-4 my-6 h-screen">
        <Skeleton height={40} />
        <div className="my-6 overflow-x-auto relative shadow-md sm:rounded-lg table-scroll">
          <TableSkeleton rows={10} columns={6} />
        </div>
      </section>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="p-4">
      <h1 className="text-3xl md:text-3xl font-semibold text-secondary">
        Your Pay History
      </h1>
      <div style={{ flex: 1, overflowX: "auto" }}>
        <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
          <thead className="text-base font-bold uppercase text-gray-700 h-8">
            <tr>
              <th scope="col" className="py-3 px-6">
                Payroll Id
              </th>

              <th scope="col" className="py-3 px-6">
                Month Year
              </th>

              <th scope="col" className="py-3 px-6">
                Total Allowances
              </th>

              <th scope="col" className="py-3 px-6">
                Total Deductions
              </th>

              <th scope="col" className="py-3 px-6">
                Net Pay
              </th>

              <th scope="col" className="py-3 px-6">
                Payment Date
              </th>
            </tr>
          </thead>

          <tbody>
            {data.result.length > 0 && (
              <tr
                className="border-b light:bg-gray-200 light:border-gray-200"
                key={data.result[0].payroll_id}
              >
                <td className="py-4 px-6">{data.result[0].payroll_id}</td>
                <td className="py-4 px-6">{data.result[0].month_year}</td>
                <td className="py-4 px-6">{data.result[0].total_allowances}</td>
                <td className="py-4 px-6">{data.result[0].total_deductions}</td>
                <td className="py-4 px-6">{data.result[0].net_pay}</td>
                <td className="py-4 px-6">
                  {data.result[0].payment_date.split("T")[0]}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SalaryInformation;
