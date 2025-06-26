const serviceModel = require('../models/serviceModel');
const { getClientById } = require('./clientController');

const serviceController = {
    async createService(req, res, next) {
        try {
            const data = await serviceModel.create(req.body);
            res.status(201).json({ success: true, message: 'Service created', data });
        } catch (error) {
            next(error);
        }
    },

    async updateService(req, res, next) {
        try {
            const { id } = req.params;
            const data = await serviceModel.update(id, req.body);
            res.status(200).json({ success: true, message: 'Service updated', data });
        } catch (error) {
            next(error);
        }
    },
    async statusUpdate(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!status) return res.status(400).json({ success: false, message: 'Status is required' });
            const data = await serviceModel.statusUpdate(id, status);
            res.status(200).json({ success: true, message: 'Service status updated', data });
        } catch (error) {
            next(error);
        }

    },
    async paymentFilter(req, res, next) {
        try {
            const status = parseInt(req.params.status);
            if (![0, 1, 2, 3].includes(status)) {
                return res.status(400).json({ success: false, message: 'Invalid payment status' });
            }
            const data = await serviceModel.paymentFilter(status);
            res.status(200).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },
    async getClientById(req, res, next) {
        try {
            const { clientId } = req.params;
            const data = await serviceModel.getByClientId(clientId);
            if (!data) return res.status(404).json({ success: false, message: 'Client not found' });
            res.status(200).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },


    async getAllServices(req, res, next) {
        try {
            const data = await serviceModel.getAll();
            res.status(200).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    async getServiceById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await serviceModel.getById(id);
            if (!data) return res.status(404).json({ success: false, message: 'Service not found' });
            res.status(200).json({ success: true, data });
        } catch (error) {
            next(error);
        }
    },

    async deleteService(req, res, next) {
        try {
            const { id } = req.params;
            const data = await serviceModel.delete(id);
            res.status(200).json({ success: true, message: 'Service deleted', data });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = serviceController;
