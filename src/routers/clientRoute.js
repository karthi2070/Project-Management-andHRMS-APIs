const express = require('express');
const ClientController = require('../controllers/clientController');

const router = express.Router();
// Client Routes
router.get ('/get-all-clients-details/:client_id', ClientController.getAllClientDetailsById);
router.post('/create-client', ClientController.createClient);
router.get('/get-clients-list', ClientController.getAllClients);
router.get('/get-client-id/:id', ClientController.getClientById);
router.put('/update-client/:id', ClientController.updateClient);
router.patch('/delete-client/:id', ClientController.softDeleteClient);   

// Client Dashboard
router.get('/client-dashboard-clientId/:id', ClientController.getPerClientDashboardDetails);
router.get('/client-dashboard', ClientController.getClientDashboard);
// Invoice Routes
router.get('/invoice/get-invoices-between-dates', ClientController.getInvoicesBetweenDates);
router.get('/invoice/get-total-invoice', ClientController.getTotalInvoice);
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
router.get('/invoice/get-invoice-EMI-payment-id/:invoice_id/:id', ClientController.findEMIPymentInvoiceById); 



module.exports = router;
