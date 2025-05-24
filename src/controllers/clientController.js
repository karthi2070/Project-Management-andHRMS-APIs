const ClientModel = require('../models/clientModel');

const ClientController = {
    async createClient(req, res ,next) {
        try {
            const client = await ClientModel.createClient(req.body);
            res.status(201).json(client);
        } catch (error) {
           next(error);        }
    },

    async getAllClients(req, res ,next) {
        try {
            const clients = await ClientModel.getAllClients();
            res.status(200).json(clients);
        } catch (error) {
           next(error);        }
    },

    async getClientById(req, res ,next) {
        try {
            const client = await ClientModel.getClientById(req.params.id);
            if (!client) {
                return res.status(404).json({ message: 'Client not found' });
            }
            res.status(200).json(client);
        } catch (error) {
           next(error);        }
    },

    async updateClient(req, res ,next) {
        try {
            const updatedClient = await ClientModel.updateClient(req.params.id, req.body);
            res.status(200).json(updatedClient);
        } catch (error) {
           next(error);        }
    },

    async softDeleteClient(req, res ,next) {
        try {
            const deletedClient = await ClientModel.softDeleteClient(req.params.id);
            res.status(200).json(deletedClient);
        } catch (error) {
           next(error);
        }
    }
};

module.exports = ClientController;
