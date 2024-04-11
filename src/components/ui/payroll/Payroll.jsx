import React from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../../api/axios";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "../common/TableSkeleton";

const Payroll = () => {
  const getAllPayrolls = async () => {
    const response = await axiosInstance.get("/api/payroll/getpayroll");
    return response.data;
  };

  const { data, isLoading, error } = useQuery("payrolls", getAllPayrolls);

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
      <h1 className="text-3xl font-semibold text-secondary">Payroll Details</h1>
      <div className="my-6 overflow-x-auto relative shadow-md sm:rounded-lg table-scroll">
        {/* Wrap the table in a div with the class "table-scroll" */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          {/* Table contents */}

          <thead className="text-base font-bold uppercase text-gray-700 h-8">
            <tr>
              <th scope="col" className="py-3 px-6">
                User Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>

              <th scope="col" className="py-3 px-6">
                Department
              </th>

              <th scope="col" className="py-3 px-6">
                Position
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
            {data.result.map((payroll) => (
              <tr
                key={payroll.payroll_id}
                className="bg-white border-b light:bg-gray-200 light:border-gray-200"
              >
                <td className="py-4 px-6">{payroll.user_name}</td>
                <td className="py-4 px-6">{payroll.email}</td>
                <td className="py-4 px-6">{payroll.department}</td>
                <td className="py-4 px-6">{payroll.title}</td>

                <td className="py-4 px-6">{payroll.month_year}</td>
                <td className="py-4 px-6">{payroll.total_allowances}</td>
                <td className={`py-4 px-6`}>{payroll.total_deductions}</td>
                <td className={`py-4 px-6`}>{payroll.net_pay}</td>
                <td className={`py-4 px-6`}>{payroll.payment_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Payroll;
