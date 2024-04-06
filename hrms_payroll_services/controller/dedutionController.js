const deductionModel = require("../model/deductionModel");

// create allowence controller
exports.creatededuction = async (req, res) => {
  const { employee_id, deduction_type, amount } = req.body;
  try {
    const result = await deductionModel.creatededuction(
      employee_id,
      deduction_type,
      amount
    );
    res.status(200).json({
      success: true,
      message: "Dedection created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get allowence controller
exports.getDeduction = async (req, res) => {
  try {
    const result = await deductionModel.getDeduction();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
