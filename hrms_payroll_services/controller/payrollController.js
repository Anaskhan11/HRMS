const payrollModel = require("../model/payrollModel");

// create payroll controller
exports.createPayroll = async (req, res) => {
  const {
    employee_id,
    salary_id,
    month_year,
    total_allowances,
    total_deductions,
    net_pay,
  } = req.body;
  try {
    const result = await payrollModel.createpayroll(
      employee_id,
      salary_id,
      month_year,
      total_allowances,
      total_deductions,
      net_pay
    );
    res
      .status(200)
      .json({ success: true, message: "Payroll created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get payroll controller
exports.getPayroll = async (req, res) => {
  try {
    const result = await payrollModel.getPayroll();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get total deductions and allowances controller
exports.getTotalDeductionsAndAllowances = async (req, res) => {
  const { employee_id } = req.params;
  try {
    const result = await payrollModel.getTotalDeductionsAndAllowances(
      employee_id
    );
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPayrollByEmployeeId = async (req, res) => {
  const { employee_id } = req.params;

  try {
    const result = await payrollModel.getPayrollByEmployeeId(employee_id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
