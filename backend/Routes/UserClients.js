const express = require('express');
const router = express.Router();
const { addClient ,getClients,updateClient,deleteClient} = require('../Controllers/UserClientsController');


router.post('/addClient', addClient);
router.get('/getClients', getClients);
router.put('/updateClient/:id', updateClient);
router.delete("/deleteClient/:id", deleteClient);


module.exports = router;
