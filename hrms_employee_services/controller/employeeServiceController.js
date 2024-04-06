const employeeServiceModel = require("../models/employeeServiceModel");
const userServiceController = require("../../hrms_user_services_Authentication/controller/userServiceController");
const employmentServiceModel = require("../models/employmentServiceModel");

exports.createEmployee = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    fatherName,
    gender,
    address,
    date_of_birth,
    religion,
    phoneNumber,
    emergencyContact,
    department_id,
    position_id,
  } = req.body;

  try {
    const user = await userServiceController.createUserService(
      name,
      email,
      password,
      role
    );
    if (user["Existing email"]) {
      return res.status(400).json({ message: " email already exist" });
    }

    const user_id = user.user_id;
    const result = await employeeServiceModel.createEmployee(
      fatherName,
      gender,
      address,
      date_of_birth,
      religion,
      phoneNumber,
      emergencyContact,
      user_id
    );

    const emplomentResult = await employmentServiceModel.createEmployment(
      result.insertId,
      department_id,
      position_id
    );
    if (emplomentResult["Existing employee_id"]) {
      return res.status(400).json({ message: " employee_id already exist" });
    }

    res.status(200).json({
      success: true,
      message: "Employee created Sucessfully",
      result: {
        user_id,
        employee_id: result.insertId,
        name,
        email,
        role,
        fatherName,
        gender,
        address,
        date_of_birth,
        religion,
        phoneNumber,
        emergencyContact,
      },
      emplomentResult: {
        id: result.insertId,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const result = await employeeServiceModel.getAllEmployees();
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeDepartmentAndPosition = async (req, res) => {
  try {
    const result =
      await employeeServiceModel.getEmployeeDepartmentAndPosition();
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchEmployee = async (req, res) => {
  const { name } = req.params;
  const { department, position } = req.body;

  try {
    const result = await employeeServiceModel.searchEmployee(
      name,
      department,
      position
    );
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
