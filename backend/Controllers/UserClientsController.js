const db = require('../Models/db.js');
const { Op } = require("sequelize");
const Clients = db.Clients;   
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const addClient = async (req, res) => {
  const { name, email, companyName } = req.body;

  if (!name || !email || !companyName) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if user exists
    const existingUser = await Clients.findOne({ where: { companyName } });
    if (existingUser) {
      return res.status(409).json({ message: 'Client already exists with this companyName.' });
    }


    // Create new user
    const user = await Clients.create({
      name,
      email,
      companyName,
    });

    res.status(201).json({
      message: 'Clients Add successfully',
      userId: user.id,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error registering Clients',
      error: err.message,
    });
  }
};
const getClients = async (req, res) => {
  try {
    // Check if user exists
    const existingUser = await Clients.findAll();
    if (existingUser) {
       res.status(201).json({
      message: 'Clients Fatch Succesfuly',
      users: existingUser,
    });
    }else{
       res.status(400).json({
      message: 'Clients Fatch Unsuccesfuly',
    });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error registering user',
      error: err.message,
    });
  }
};
const updateClient = async (req, res) => {
const {id } = req.params;
  const { name, companyName, email } = req.body;

  try {
    // Find user by ID
    const user = await Clients.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update only provided fields
    if (name) user.name = name;
    if (email) user.email = email;
      if (companyName) user.companyName = companyName;

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
const deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Clients.findByPk(id);
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

module.exports = { addClient ,getClients,updateClient,deleteClient};
