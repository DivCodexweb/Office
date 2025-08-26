const express = require('express');
const router = express.Router();
const { addexpancetype,getExpancetype,updateexpancetype,deleteexpance,D_A_xpancetype,addexpance,addsalery} = require('../Controllers/ExpanceController');


router.post('/addexpancetype', addexpancetype);
router.get('/getExpancetype', getExpancetype);
router.put('/updateexpancetype/:id', updateexpancetype);
router.delete("/deleteexpance/:id", deleteexpance);
router.put('/D_A_xpancetype/:id/:status', D_A_xpancetype);
router.post('/addexpance', addexpance);
router.post('/addsalery', addsalery);

module.exports = router;
