const db = require('../Models/db.js');
const { Op } = require("sequelize");
const Income = db.Income;   
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const addIncome = async (req, res) => {
  const { Creditdebit, amount, clientName,description,clientId } = req.body;

  if (!Creditdebit || !amount || !clientName || !description || !clientId) {
    return res.status(400).json({ message: 'Incomplete Information!' });
  }

  try {

    // Create new user
    const user = await Income.create({
     Creditdebit: Creditdebit,
    ammount:  amount,
     clientname: clientName,
     description: description,
     clientid: clientId
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


module.exports = {addIncome};
