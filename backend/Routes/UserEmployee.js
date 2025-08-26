const express = require('express');
const router = express.Router();
const { addEmployee ,getEmployees,updateEmployee,deleteEmployee} = require('../Controllers/UserEmployeeController');


router.post('/addEmployee', addEmployee);
router.get('/getEmployees', getEmployees);
router.put('/updateEmployee/:id', updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);


module.exports = router;
