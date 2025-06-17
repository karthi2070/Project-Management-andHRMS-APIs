const express = require('express');
const ClientController = require('../controllers/clientController');

const router = express.Router();

router.post('/client/create-client', ClientController.createClient);
router.get('/client/get-clients-list', ClientController.getAllClients);
router.get('/client/get-client-id/:id', ClientController.getClientById);
router.put('/client/update-client/:id', ClientController.updateClient);
router.patch('/client/delete-client/:id', ClientController.softDeleteClient);   

// Invoice Routes
router.post('/invoice/create-invoice', ClientController.createInvoice);
router.get('/invoice/get-invoices', ClientController.findAllInvoices);
router.get('/invoice/get-invoice/:client_id/:invoice_id', ClientController.findInvoiceById); 
router.get('/invoice/get-invoice-by-client/:clientId', ClientController.findInvoiceByClientId);
router.get('/invoice/get-invoice-by-number/:invoiceNumber', ClientController.findInvoiceNum);  
router.put('/invoice/update-invoice/:id', ClientController.updateInvoice);
router.patch('/invoice/delete-invoice/:id', ClientController.softDeleteInvoice);

//insert emi payment

router.post('/invoices/emi-payment/:invoice_id',ClientController. recordEMIPayment);
router.get('/invoice/get-invoice-EMI-payment/:client_id/:invoice_id', ClientController.findEMIPymentInvoiceId); 



module.exports = router;
