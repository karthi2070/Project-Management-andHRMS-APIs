const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.post('/service/create-service', serviceController.createService);
router.put('/service/update-service/:id', serviceController.updateService);
router.get('/service/get-all-service', serviceController.getAllServices);
router.get('/service/get-by-id/:id', serviceController.getServiceById);
router.patch('/service/delete-service/:id', serviceController.deleteService);

module.exports = router;
