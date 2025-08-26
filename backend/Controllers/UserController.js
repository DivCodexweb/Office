const db = require('../Models/db.js');
const { Op } = require("sequelize");
const User = db.User;   
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "staff", // default role = staff
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: user.id,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error registering user',
      error: err.message,
    });
  }
};
const getuser = async (req, res) => {
  try {
    // Check if user exists
    const existingUser = await User.findAll();
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
const updateuser = async (req, res) => {
const {id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    // Find user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  const hashedPassword = await bcrypt.hash(password, 10);
    // Update only provided fields
    if (name) user.name = name;
    if (email) user.email = email;
      if (role) user.role = role;
    if (password) user.password = hashedPassword; // hash if needed

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
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
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
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid Email!' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Password!' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = { registerUser, loginUser ,getuser,updateuser,deleteUser};
