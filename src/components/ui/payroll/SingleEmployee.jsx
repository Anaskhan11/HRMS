// Libs
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import axiosInstance from "../../../api/axios";
import { toast } from "react-toastify";

// Icons
import { FaRegUser } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const SingleEmployee = ({ employee }) => {
  const [dropDown, setDropDown] = useState(false);
  const [active, setActive] = useState("salary");
  const [salaryExist, setSalaryExist] = useState(null);

  // States for backend
  const [salary, setSalary] = useState(0);
  const [deductionType, setDeductionType] = useState("");
  const [deductionAmount, setDeductionAmount] = useState(0);
  const [allowanceType, setAllowanceType] = useState("");
  const [allowanceAmount, setAllowanceAmount] = useState(0);
  const [payStartDate, setPayStartDate] = useState("");
  const [payEndDate, setPayEndDate] = useState("");
  const [totalAllowances, setTotalAllowances] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [netPay, setNetPay] = useState(0);

  const showDropdown = () => {
    setDropDown(!dropDown);
  };

  useEffect(() => {
    const getSalaryForEmployee = async () => {
      const response = await axiosInstance.get(
        `/api/payroll/getsalary/${employee.employee_id}`
      );

      if (response.data.result.length > 0) {
        setSalaryExist(response.data.result[0]);
        console.log(response.data.result[0]);
      }
    };

    getSalaryForEmployee();
  }, []);

  // handle Add Salary
  const addSalary = async (data) => {
    const response = await axiosInstance.post(
      "/api/payroll/createsalary",
      data
    );
    return response.data;
  };

  const SalaryMutation = useMutation(addSalary);

  const handleAddSalary = async (e) => {
    e.preventDefault();

    const data = {
      employee_id: employee.employee_id,
      base_salary: salary,
    };
    SalaryMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Salary Added Successfully");
      },
      onError: () => {
        toast.error("Failed to Add Salary");
      },
    });
  };

  // handle Add Deduction
  const addDeduction = async (data) => {
    const response = await axiosInstance.post(
      "/api/payroll/creatededuction",
      data
    );
    return response.data;
  };

  const DeductionMutation = useMutation(addDeduction);

  const handleAddDeduction = async (e) => {
    e.preventDefault();

    const data = {
      employee_id: employee.employee_id,
      deduction_type: deductionType,
      amount: deductionAmount,
    };

    DeductionMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Deduction added successfully");
      },
      onError: () => {
        toast.error("Failed to add deduction");
      },
    });
  };

  // handle Add Allowance
  const addAllowance = async (data) => {
    const response = await axiosInstance.post(
      "/api/payroll/createallowence",
      data
    );
    return response.data;
  };

  const AllowanceMutation = useMutation(addAllowance);

  const handleAddAllowance = async (e) => {
    e.preventDefault();

    const data = {
      employee_id: employee.employee_id,
      allowance_type: allowanceType,
      amount: allowanceAmount,
    };

    AllowanceMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Allowance added successfully");
      },
      onError: () => {
        toast.error("Failed to add allowance");
      },
    });
  };

  // handle Add Payroll

  const addPayroll = async (data) => {
    const response = await axiosInstance.post(
      "/api/payroll/createpayroll",
      data
    );
    return response.data;
  };

  const PayrollMutation = useMutation(addPayroll);

  const handleAddPayroll = async (e) => {
    e.preventDefault();

    const data = {
      employee_id: employee.employee_id,
      salary_id: salaryExist.salary_id,
      pay_period_start: payStartDate,
      pay_period_end: payEndDate,
      total_allowances: totalAllowances,
      total_deductions: totalDeductions,
      net_pay: netPay,
    };

    PayrollMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Payroll added successfully");
      },
      onError: () => {
        toast.error("Failed to add payroll");
      },
    });
  };

  return (
    <>
      <tr className="border-b light:bg-gray-200 light:border-gray-200">
        <td className="py-4 px-6">
          {employee.image ? (
            <img
              src={`${import.meta.env.VITE_APP_BASE_URL}/${employee.image}`}
              alt="Employee"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <FaRegUser className="w-10 h-10 rounded-full" />
          )}
        </td>
        <td className="py-4 px-6">{employee.name}</td>
        <td className="py-4 px-6">{employee.email}</td>
        <td className="py-4 px-6">{employee.department_name}</td>
        <td className="py-4 px-6">{employee.position_title}</td>
        <td className="py-4 px-6">{employee.gender}</td>
        <td className="py-4 px-6">
          <span
            className={`font-medium text-primary hover:underline ${
              active === "salary" && "active"
            }`}
            onClick={() => setActive("salary")}
          >
            <TbEdit className="w-6 h-6 cursor-pointer" onClick={showDropdown} />
          </span>
        </td>
      </tr>
      {dropDown && (
        <div className="absolute top-0 left-0 w-screen h-full bg-slate-900 bg-opacity-30 flex items-center justify-center z-0">
          <div className="bg-white p-4 shadow-md z-10 rounded-md">
            <button
              className="px-2 py-1 bg-red-500 text-white ml-auto rounded-md"
              onClick={showDropdown}
            >
              Close
            </button>
            <div className="flex items-center gap-3 my-4">
              <button
                className={`px-3 py-2 rounded-md bg-primary text-white ${
                  active === "salary" && "active bg-primaryDark"
                }`}
                onClick={() => setActive("salary")}
              >
                Salary
              </button>
              <button
                className={`px-3 py-2 rounded-md bg-primary text-white ${
                  active === "deduction" && "active bg-primaryDark"
                }`}
                onClick={() => setActive("deduction")}
              >
                Deduction
              </button>
              <button
                className={`px-3 py-2 rounded-md bg-primary text-white ${
                  active === "allowance" && "active bg-primaryDark"
                }`}
                onClick={() => setActive("allowance")}
              >
                Allowance
              </button>
              {salaryExist && (
                <button
                  className={`px-3 py-2 rounded-md bg-primary text-white ${
                    active === "payroll" && "active bg-primaryDark"
                  }`}
                  onClick={() => setActive("payroll")}
                >
                  Payroll
                </button>
              )}
            </div>

            {/* ----------- SALARY FORM ----------- */}

            {active === "salary" && (
              <form onSubmit={handleAddSalary}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Base Salary
                  </label>
                  <div className="flex items-center gap-2 rounded-md px-2 py-1 border border-2 mt-1 border-slate-400">
                    <RiMoneyDollarCircleFill className="h-8 w-8" />
                    <input
                      type="number"
                      name="base_salary"
                      id="base_salary"
                      className="w-full border-none bg-transparent outline-none"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                  </div>
                </div>
                <button className="px-4 py-3 w-full rounded-md bg-primary my-2 text-white">
                  Add Salary
                </button>
              </form>
            )}

            {/* ----------- DEDUCTION FORM ----------- */}

            {active === "deduction" && (
              <form onSubmit={handleAddDeduction}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Deduction Type
                  </label>
                  <textarea
                    type="text"
                    name="deduction_type"
                    id="deduction_type"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    value={deductionType}
                    onChange={(e) => setDeductionType(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <div className="flex items-center gap-2 rounded-md px-2 py-1 border border-2 mt-1 border-slate-400">
                    <RiMoneyDollarCircleFill className="h-8 w-8" />
                    <input
                      type="number"
                      name="decution_amount"
                      id="decution_amount"
                      className="w-full border-none bg-transparent outline-none"
                      value={deductionAmount}
                      onChange={(e) => setDeductionAmount(e.target.value)}
                    />
                  </div>
                </div>

                <button className="px-4 py-3 w-full rounded-md bg-primary my-2 text-white">
                  Add Deduction
                </button>
              </form>
            )}

            {/* ----------- ALLOWANCE FORM ----------- */}
            {active === "allowance" && (
              <form onSubmit={handleAddAllowance}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Allowance Type
                  </label>
                  <textarea
                    type="text"
                    name="allowance_type"
                    id="allowance_type"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    value={allowanceType}
                    onChange={(e) => setAllowanceType(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <div className="flex items-center gap-2 rounded-md px-2 py-1 border border-2 mt-1 border-slate-400">
                    <RiMoneyDollarCircleFill className="h-8 w-8" />
                    <input
                      type="number"
                      name="allowance_amount"
                      id="allowance_amount"
                      className="w-full border-none bg-transparent outline-none"
                      value={allowanceAmount}
                      onChange={(e) => setAllowanceAmount(e.target.value)}
                    />
                  </div>
                </div>

                <button className="px-4 py-3 w-full rounded-md bg-primary my-2 text-white">
                  Add Allowance
                </button>
              </form>
            )}

            {/* ----------- PAYROLL FORM ----------- */}

            {active === "payroll" && (
              <form onSubmit={handleAddPayroll}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pay period start
                  </label>
                  <input
                    type="date"
                    name="pay_period_start"
                    id="pay_period_start"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    value={payStartDate}
                    onChange={(e) => setPayStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pay period End
                  </label>
                  <input
                    type="date"
                    name="pay_period_end"
                    id="pay_period_end"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    value={payEndDate}
                    onChange={(e) => setPayEndDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Total Allowances
                  </label>
                  <div className="flex items-center gap-2 rounded-md px-2 py-1 border border-2 mt-1 border-slate-400">
                    <RiMoneyDollarCircleFill className="h-8 w-8" />
                    <input
                      type="number"
                      name="total_allowances"
                      id="total_allowances"
                      className="w-full border-none bg-transparent outline-none"
                      value={totalAllowances}
                      onChange={(e) => setTotalAllowances(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Total Deductions
                  </label>
                  <div className="flex items-center gap-2 rounded-md px-2 py-1 border border-2 mt-1 border-slate-400">
                    <RiMoneyDollarCircleFill className="h-8 w-8" />
                    <input
                      type="number"
                      name="total_deductions"
                      id="total_deductions"
                      className="w-full border-none bg-transparent outline-none"
                      value={totalDeductions}
                      onChange={(e) => setTotalDeductions(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Net Pay
                  </label>
                  <div className="flex items-center gap-2 rounded-md px-2 py-1 border border-2 mt-1 border-slate-400">
                    <RiMoneyDollarCircleFill className="h-8 w-8" />
                    <input
                      type="number"
                      name="net_pay"
                      id="net_pay"
                      className="w-full border-none bg-transparent outline-none"
                      value={netPay}
                      onChange={(e) => setNetPay(e.target.value)}
                    />
                  </div>
                </div>

                <button className="px-4 py-3 w-full rounded-md bg-primary my-2 text-white">
                  Add Payroll
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleEmployee;
