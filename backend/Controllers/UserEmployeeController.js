const db = require('../Models/db.js');
const { Op } = require("sequelize");
const Employee = db.Employee;   
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const addEmployee = async (req, res) => {
  const { name, email, number } = req.body;

  if (!name || !email || !number) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if user exists
    const existingUser = await Employee.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Employee already exists with this email.' });
    }


    // Create new user
    const user = await Employee.create({
      name,
      email,
      number,
    });

    res.status(201).json({
      message: 'Employee Add successfully',
      userId: user.id,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error registering user',
      error: err.message,
    });
  }
};
const getEmployees = async (req, res) => {
  try {
    // Check if user exists
    const existingUser = await Employee.findAll();
    if (existingUser) {
       res.status(201).json({
      message: 'User Fatch Succesfuly',
      users: existingUser,
    });
    }else{
       res.status(400).json({
      message: 'User Fatch Unsuccesfuly',
    });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error registering user',
      error: err.message,
    });
  }
};
const updateEmployee = async (req, res) => {
const {id } = req.params;
  const { name, number, email } = req.body;

  try {
    // Find user by ID
    const user = await Employee.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update only provided fields
    if (name) user.name = name;
    if (email) user.email = email;
      if (number) user.number = number;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating user",
      error: err.message,
    });
  }
};
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Employee.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting user",
      error: err.message,
    });
  }
};

module.exports = { addEmployee ,getEmployees,updateEmployee,deleteEmployee};
