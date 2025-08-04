const express = require('express');
const QuotationController = require('../controllers/quotationController');

const router = express.Router();

router.post('/create-quotation', QuotationController.createQuotation);
router.get('/get-list-quotation', QuotationController.getAllQuotations);
router.get('/get-by-id/:id', QuotationController.getQuotationById);
router.put('/update-quotation/:id', QuotationController.updateQuotation);
router.patch('/delete-quotation/:id', QuotationController.softDeleteQuotation);

module.exports = router;
