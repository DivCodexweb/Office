const express = require('express');
const router = express.Router();
const { registerUser ,loginUser,getuser,updateuser,deleteUser} = require('../Controllers/UserController');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getuser', getuser);
router.put('/updateuser/:id', updateuser);
router.delete("/deleteUser/:id", deleteUser);


module.exports = router;
