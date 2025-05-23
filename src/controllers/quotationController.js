const QuotationModel = require('../models/quotationModel');

const QuotationController = {
    async createQuotation(req, res ,next) {
        try {
            const quotation = await QuotationModel.createQuotation(req.body);
            res.status(201).json(quotation);
        } catch (error) {
            next(error)  
        }
    },

    async getAllQuotations(req, res ,next) {
        try {
            const quotations = await QuotationModel.getAllQuotations();
            res.status(200).json(quotations);
        } catch (error) {
             next(error)  
        }
    },

    async getQuotationById(req, res ,next) {
        try {
            const quotation = await QuotationModel.getQuotationById(req.params.id);
            if (!quotation) {
                return res.status(404).json({ message: 'Quotation not found' });
            }
            res.status(200).json(quotation);
        } catch (error) {
             next(error)  
        }
    },

    async updateQuotation(req, res ,next) {
        try {
            const updatedQuotation = await QuotationModel.updateQuotation(req.params.id, req.body);
            res.status(200).json(updatedQuotation);
        } catch (error) {
 next(error)         
}
    },

    async softDeleteQuotation(req, res,next) {
        try {
            const deletedQuotation = await QuotationModel.softDeleteQuotation(req.params.id);
            res.status(200).json(deletedQuotation);
        } catch (error){
         next(error) 
        }
    }
};

module.exports = QuotationController;
