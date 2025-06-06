const ClientModel = require('../models/clientModel');

const ClientController = {
    async createClient(req, res ,next) {
        try {
            const {name, company_name, mail, phone1, phone2, phone3, gst_num, address, city, state, pincode}=req.body

            const count = await ClientModel.getClientCount()
            console.log(count)
            const client_id =`CLI000${count+1}`
            const client_data= {name, company_name,client_id, mail, phone1, phone2, phone3, gst_num, address, city, state, pincode}
            const client = await ClientModel.createClient(client_data);
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
    },

    // Invoice Methods
    async createInvoice(req, res, next) {
        try {
            const invoiceId = await ClientModel.createInvoice(req.body);
            res.status(201).json({ id: invoiceId });
        } catch (error) {
            next(error);
        }
    },
    async findAllInvoices(req, res, next) {
        try {
            const invoices = await ClientModel.findAllincoice();
            res.status(200).json(invoices);
        } catch (error) {
            next(error);
        }
    },
    async findInvoiceById(req, res, next) {
        try {
            const invoice = await ClientModel.findById(req.params.id);
            if (!invoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json(invoice);
        } catch (error) {
            next(error);
        }
    },
    async findInvoiceNum(req, res, next) {
        try {
            const invoice = await ClientModel.findByInvoiseNum(req.params.invoice_number);
            if (!invoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json(invoice);
        } catch (error) {
            next(error);
        }
    },
    async findInvoiceByClientId(req, res, next) {
        try {

            const invoices = await ClientModel.findByInvoiseclintId(req.params.clientId);
            res.status(200).json(invoices);
        } catch (error) {
            next(error);
        }
    },

    async updateInvoice(req, res, next) {
        try {
            const affectedRows = await ClientModel.update(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Invoice not found or no changes made' });
            }
            res.status(200).json({ message: 'Invoice updated successfully' });
        } catch (error) {
            next(error);
        }
    },

    async softDeleteInvoice(req, res, next) {
        try {
            const affectedRows = await ClientModel.softDelete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json({ message: 'Invoice deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = ClientController;
