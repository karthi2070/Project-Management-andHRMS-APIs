const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.post('/create-service', serviceController.createService);
router.put('/update-service/:id', serviceController.updateService);
router.patch('/status-update/:id', serviceController.statusUpdate);
router.get('/get-all-service', serviceController.getAllServices);
router.get('/get-by-id/:id', serviceController.getServiceById);
router.get('/get-by-client-id/:clientId', serviceController.getClientById);
router.get('/payment-filter/:status', serviceController.paymentFilter);
router.patch('/delete-service/:id', serviceController.deleteService);
router.get('/get-service-payment-history-clientId-serviceId/:client_id/:service_id',serviceController.GetServicePaymentByClientIdServiceId);
router.get('/get-service-payment-history-serviceId-id/:service_id/:id', serviceController.GetServicePaymentByServiceIdandId);

//
router.get('/upcoming-payment-summary', serviceController.upcomingPaymentDue);
router.post('/due-payment/:service_id', serviceController.recordServiceEMIPayment);

module.exports = router;
