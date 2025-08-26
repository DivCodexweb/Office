const db = require('../Models/db.js');
const { Op } = require("sequelize");
const Expancetype = db.Expancetype;   
const Expance = db.Expance;   
const Salery = db.Salery;   
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const addexpancetype = async (req, res) => {
  const { expancetype } = req.body;

  if (!expancetype ) {
    return res.status(400).json({ message: 'Incomplete Information!' });
  }

  try {

    // Create new user
    const user = await Expancetype.create({
      expancetype,
      status: "Active"
     });

    res.status(201).json({
      message: 'Payment successfully',
      userId: user.id,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error registering user',
      error: err.message,
    });
  }
};
const getExpancetype = async (req, res) => {
  try {
    // Check if user exists
    const existingUser = await Expancetype.findAll();
    if (existingUser) {
       res.status(201).json({
      message: 'Expancetype Fatch Succesfuly',
      users: existingUser,
    });
    }else{
       res.status(400).json({
      message: 'Expancetype Fatch Unsuccesfuly',
    });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error registering user',
      error: err.message,
    });
  }
};
const updateexpancetype = async (req, res) => {
const {id} = req.params;
  const { expancetype } = req.body;

  try {
    // Find user by ID
    const user = await Expancetype.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update only provided fields
    if (expancetype) user.expancetype = expancetype;
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
const deleteexpance = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Expancetype.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Expancetype not found" });
    }

    await user.destroy();

    res.status(200).json({
      message: "Expancetype deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting user",
      error: err.message,
    });
  }
};
const D_A_xpancetype = async (req, res) => {
const {id,status} = req.params;

  try {
    // Find user by ID
    const user = await Expancetype.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Expancetype not found" });
    }
    let setstatus
    if(status == "Active"){
  setstatus = "Suspend"
    }else if(status == "Suspend"){
 setstatus = "Active"
    }
    if (status) user.status = setstatus;
    await user.save();

    res.status(200).json({
      message: "Expancetype updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating user",
      error: err.message,
    });
  }
};
const addexpance = async (req, res) => {
  const { Creditdebit, amount, expanceTypeName,description,expanceTypeId } = req.body;

  if (!Creditdebit || !amount || !expanceTypeName || !description || !expanceTypeId) {
    return res.status(400).json({ message: 'Incomplete Information!' });
  }

  try {

    // Create new user
    const user = await Expance.create({
     Creditdebit: Creditdebit,
     ammount:  amount,
     expancename:expanceTypeName,
     description: description,
     expanceid:expanceTypeId
    });

    res.status(201).json({
      message: 'Expance successfully',
      userId: user.id,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error registering Expance',
      error: err.message,
    });
  }
};
const addsalery = async (req, res) => {
  const { Creditdebit, amount, employeeName,description,employeeId } = req.body;

  if (!Creditdebit || !amount || !employeeName || !description || !employeeId) {
    return res.status(400).json({ message: 'Incomplete Information!' });
  }

  try {

    // Create new user
    const user = await Salery.create({
     Creditdebit: Creditdebit,
     ammount:  amount,
     employeeName:employeeName,
     description: description,
     employeeId:employeeId
    });

    res.status(201).json({
      message: 'Expance successfully',
      userId: user.id,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error registering Expance',
      error: err.message,
    });
  }
};
module.exports = {addexpancetype,getExpancetype,updateexpancetype,deleteexpance,D_A_xpancetype,addexpance,addsalery};
