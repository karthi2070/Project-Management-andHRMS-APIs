const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.post('/service/create-service', serviceController.createService);
router.put('/service/update-service/:id', serviceController.updateService);
router.patch('/service/status-update/:id', serviceController.statusUpdate);
router.get('/service/get-all-service', serviceController.getAllServices);
router.get('/service/get-by-id/:id', serviceController.getServiceById);
router.get('/service/get-by-client-id/:clientId', serviceController.getClientById);
router.get('/service/payment-filter/:status', serviceController.paymentFilter);
router.patch('/service/delete-service/:id', serviceController.deleteService);

router.get('/service/upcoming-payment-summary', serviceController.upcomingPaymentDue);

router.post('/service/due-payment/:service_id', serviceController.recordServiceEMIPayment);

module.exports = router;
