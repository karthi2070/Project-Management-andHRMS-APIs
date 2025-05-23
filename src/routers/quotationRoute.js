const express = require('express');
const QuotationController = require('../controllers/quotationController');

const router = express.Router();

router.post('/quotation/create-quotation', QuotationController.createQuotation);
router.get('/quotation/get-list-quotation', QuotationController.getAllQuotations);
router.get('/quotation/get-by-id/:id', QuotationController.getQuotationById);
router.put('/quotation/update-quotation/:id', QuotationController.updateQuotation);
router.patch('/quotation/delete-quotation/:id', QuotationController.softDeleteQuotation);

module.exports = router;
