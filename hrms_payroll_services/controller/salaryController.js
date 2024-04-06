const salaryModel = require("../model/salaryModel");

// create salary controller
exports.createSalary = async (req, res) => {
  const { employee_id, base_salary } = req.body;
  try {
    const result = await salaryModel.createsalary(employee_id, base_salary);
    res.status(200).json({ message: "Salary created successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get salary model
exports.getSalary = async (req, res) => {
  try {
    const result = await salaryModel.getSalary();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get salary by id
exports.getSalaryById = async (req, res) => {
  const { employee_id } = req.params;
  try {
    const result = await salaryModel.getSalaryById(employee_id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
