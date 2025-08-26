const express = require('express');
const router = express.Router();
const { addIncome} = require('../Controllers/UserincomsController');


router.post('/addIncome', addIncome);


module.exports = router;
