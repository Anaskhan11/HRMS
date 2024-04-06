const allowenceModel = require("../model/allowenceModel");

// create allowence controller
exports.createAllowence = async (req, res) => {
  const { employee_id, allowance_type, amount } = req.body;
  try {
    const result = await allowenceModel.createallowence(
      employee_id,
      allowance_type,
      amount
    );
    res.status(200).json({
      success: true,
      message: "Allowence created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get allowence controller
exports.getAllowence = async (req, res) => {
  try {
    const result = await allowenceModel.getallawonce();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
