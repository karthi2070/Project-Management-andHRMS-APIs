const express = require('express');
const ClientController = require('../controllers/clientController');

const router = express.Router();

router.post('/client/create-client', ClientController.createClient);
router.get('/client/get-clients-list', ClientController.getAllClients);
router.get('/client/get-client-id/:id', ClientController.getClientById);
router.put('/client/update-client/:id', ClientController.updateClient);
router.patch('/client/delete-client/:id', ClientController.softDeleteClient);

module.exports = router;
