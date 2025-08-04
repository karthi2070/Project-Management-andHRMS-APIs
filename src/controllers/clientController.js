const ClientModel = require('../models/clientModel');
const service = require('../services/serviceService');
const  ServiceModel  = require('../models/serviceModel');

const ClientController = {
    async createClient(req, res, next) {
        try {
            const { user_id, name, company_name, mail, phone1, phone2, phone3, gst_num, address, city, state, pincode } = req.body

            const count = await ClientModel.getTotalClients()
           // console.log("count", count)
            const client_id = `CLI000${count + 1}`
            const client_data = { user_id, user_id, name, company_name, client_id, mail, phone1, phone2, phone3, gst_num, address, city, state, pincode }
            const client = await ClientModel.createClient(client_data);
            res.status(201).json(client);
        } catch (error) {
            next(error);
        }
    },

    async getAllClients(req, res, next) {
        try {
            const clients = await ClientModel.getAllClients();
            res.status(200).json(clients);
        } catch (error) {
            next(error);
        }
    },

    async getClientById(req, res, next) {
        try {
            const client = await ClientModel.getClientById(req.params.id);
            if (!client) {
                return res.status(404).json({ message: 'Client not found' });
            }
            res.status(200).json(client);
        } catch (error) {
            next(error);
        }
    },


    async updateClient(req, res, next) {
        try {
            const id = req.params.id;

            const client = await ClientModel.getClientById(id);
            if (!client) {
                return res.status(404).json({ message: 'Client not found' });
            }

            const {
                user_id, name, company_name, mail,
                phone1, phone2, phone3, gst_num,
                address, city, state, pincode } = req.body;

            const updated = await ClientModel.updateClient(
                id, user_id, name, company_name, mail,
                phone1, phone2, phone3, gst_num, address, city, state, pincode);

            if (updated) {
                return res.status(200).json({ message: "Client updated successfully" });
            } else {
                return res.status(500).json({ message: "Update failed" });
            }

        } catch (error) {
            next(error);
        }
    },

    async softDeleteClient(req, res, next) {
        try {
            const deletedClient = await ClientModel.softDeleteClient(req.params.id);
            res.status(200).json(deletedClient);
        } catch (error) {
            next(error);
        }
    },

    async getAllClientDetailsById(req, res, next) {
        try {
            const clientId = req.params.client_id;
            if (!clientId) {
                return res.status(400).json({ message: 'Client ID is required' });
            }
            const clientDashboard = await ClientModel.perClientDashBoard(clientId);
            const invoices = await ClientModel.findByInvoiseclintId(clientId);
            const service = await ServiceModel.getByClientId(clientId);
            
            const clientDashboardDetails = {
                total_invoice_amount: clientDashboard[0]['SUM(invoice_amount)'] || 0,
                total_paid_amount: clientDashboard[0]['sum(paid_amount)'] || 0,
                total_balance_amount: clientDashboard[0]['sum(balance_amount)'] || 0

            }
            const clientDetails = {
                success: true,
                message: 'Client details retrieved successfully',
                client_id: clientId,
                dashboard: clientDashboardDetails,
                invoices: invoices || [],
                services: service || []
            };
            res.status(200).json(clientDetails);
        } catch (error) {
            next(error);
        }
    },

    async getPerClientDashboardDetails(req, res, next) {
        try {
            const clientId = req.params.id;
            const clientDashboard = await ClientModel.perClientDashBoard(clientId);
            const clientDashboardDetails = {
                total_invoice_amount: clientDashboard[0]['SUM(invoice_amount)'] || 0,
                total_paid_amount: clientDashboard[0]['sum(paid_amount)'] || 0,
                total_balance_amount: clientDashboard[0]['sum(balance_amount)'] || 0

            }
            res.status(200).json(clientDashboardDetails);
        } catch (error) {
            next(error);
        }
    },

    async getClientDashboard(req, res, next) {
        try {
            const totalClients = await ClientModel.getTotalClients();
            const pendingPayments = await ClientModel.getPendingPaymentsValue();
            const renewalClients = await service.getUpcomingPayments(30);

            // const upcomingClientsCount = await ClientModel.upcomingDueClients();
            // const getRenewalClients = await ClientModel.getRenewalClients();

            res.status(200).json({
                total_clients: totalClients ? totalClients : 0,
                total_pending_payment: pendingPayments.total_pending_payment ? pendingPayments.total_pending_payment : 0,
                renewal_clients: renewalClients ? renewalClients : 0,
                // upcoming_due_clients: Array.isArray(upcomingClientsCount?.clients) ? upcomingClientsCount.clients.length : 0,
                // renewalClientsCount: Array.isArray(getRenewalClients?.clients) ? getRenewalClients.clients.length : 0
            });
        } catch (error) {
            next(error);
        }
    },

    // Invoice Methods
// id, user_id, service_name, client_id, invoice_number, invoice_amount, paid_amount, balance_amount, extra_amount, payment_status, payment_method, invoice_date, followup_date, due_date, notes, is_deleted, created_at, updated_at
    async getTotalInvoice(req, res, next) {
        try {
            const totalInvoice = await ClientModel.getTotalInvoice();
            res.status(200).json({ total_invoice: totalInvoice });
        } catch (error) {
            next(error);
        }
    },

    async createInvoice(req, res, next) {
        try {
            const { user_id, service_name, client_id, invoice_amount, paid_amount,
                balance_amount, extra_amount, payment_status, payment_method, invoice_date, followup_date, due_date, notes} = req.body;

            const count = await ClientModel.getTotalInvoice()
            const invoice_number = `INC000${count + 1}`

            const invoiceData = {
                user_id, service_name, client_id, invoice_number, invoice_amount, paid_amount,
                balance_amount, extra_amount, payment_status, payment_method, invoice_date, followup_date, due_date, notes
            }
            const invoiceId = await ClientModel.createInvoice(invoiceData);
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
 async getInvoicesBetweenDates (req, res, next)  {
  try {
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const result = await ClientModel.getInvoicesBetweenDates(start_date, end_date);
    if (result.length === 0) {
      return res.status(404).json({ message: 'No invoices found for the given date range' });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
},
    async findInvoiceById(req, res, next) {
        try {
            const { client_id, invoice_id } = req.params
            const invoice = await ClientModel.findById(client_id, invoice_id);
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
            const { user_id, service_name, client_id, invoice_amount, paid_amount, balance_amount, extra_amount,
                payment_status, payment_method, invoice_date, followup_date, due_date, notes } = req.body;
            const existingInvoice = await ClientModel.getInvoiceById(req.params.id);
            console.log("existingInvoice", existingInvoice)
            if (!existingInvoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            const inoviceAmount = Math.round(invoice_amount * 1.18 * 100) / 100;
        
        // const newBalanceAmount = existingInvoice.balance_amount === 0 || existingInvoice.balance_amount === null ? Math.round(invoice_amount * 1.18 * 100) / 100 
        // : existingInvoice.balance_amount ;
        // const paidAmount = existingInvoice.paid_amount === 0 || existingInvoice.paid_amount === null ? Math.round(invoice_amount * 1.18 * 100) / 100 
        // : existingInvoice.paid_amount ;
    const updatedPayload = { 
        user_id: user_id,
        service_name: service_name,
        client_id: client_id,
        invoice_amount: inoviceAmount,
        paid_amount: paid_amount,
        balance_amount: balance_amount,
        extra_amount: extra_amount,
        payment_status: payment_status,
        payment_method: payment_method,
        invoice_date: invoice_date,
        followup_date: followup_date,
        due_date: due_date,
        notes: notes };
        console.log("updatedPayload", updatedPayload)
            const affectedRows = await ClientModel.update(req.params.id,updatedPayload);
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
    },
    //EMI pyments findEMIPymentInvoiceById

    async findEMIPymentInvoiceId(req, res, next) {
        try {
            const { client_id, invoice_id } = req.params
            console.log(client_id, invoice_id)
            const invoice = await ClientModel.findEMIPymentInvoiceId(client_id, invoice_id);
            if (!invoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json(invoice);
        } catch (error) {
            next(error);
        }
    },
    async findEMIPymentInvoiceById(req, res, next) {
        try {
            const { invoice_id, id } = req.params
            const invoice = await ClientModel.findEMIPymentInvoiceById(invoice_id, id);
            if (!invoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json(invoice);
        } catch (error) {
            next(error);
        }
    },
    async recordEMIPayment(req, res, next) {
        try {
            const invoice_id = parseInt(req.params.invoice_id);
            const { user_id, client_id, paid_amount, payment_date, payment_method, payment_status,followup_date, notes } = req.body;
            // Step 1: Fetch invoice
            const invoice = await ClientModel.getInvoiceById(invoice_id);
            console.log("invoice", invoice)
            if (!invoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            const invoiceAmount = Number(invoice.invoice_amount);
            const currentPaid = Number(invoice.paid_amount);
            const newTotalPaid = currentPaid + Number(paid_amount);
            const balanceAmount = invoice.balance_amount - paid_amount;
console.log({"invoiceAmount" :invoiceAmount, "currentPaid": currentPaid, "newTotalPaid": newTotalPaid, "balanceAmount": balanceAmount})
            // let extra_amount = 0;
            // if (balanceAmount < 0) {
            //     extra_amount = Math.abs(balanceAmount);
            //     balanceAmount = 0;
            // }
            // console.log("extra_amount", extra_amount)
            // Step 2: Insert payment
            await ClientModel.insertPayment({
                user_id,
                client_id,
                invoice_id,
                paid_amount,
                payment_date,
                payment_method,
                payment_status,
                followup_date,
                notes
            });

            if ([1, 2, 3].includes(Number(payment_status))) {
                console.log(payment_status)
               // const newStatusId = paidAmount <= service.service_amount ? 2 : 3; //1 = unpaid, 2 = partial, 3 = paid
                const newStatusId =newTotalPaid === 0 ? 1 : newTotalPaid < invoice.invoice_amount ? 2 : 3 ;
console.log(newStatusId)
                const updateInvoiseData = {
                    paid_amount: newTotalPaid,
                    balance_amount: balanceAmount,
                    payment_status: newStatusId,
                    id: invoice_id
                }
                await ClientModel.updateInvoiceTotals(updateInvoiseData);
            }

            return res.status(200).json({
                message: 'Payment recorded',
                paid_amount: newTotalPaid,
                balance_amount: balanceAmount,
                payment_date,
                payment_status
            });

        } catch (err) {
            next(err);
        }

    }

};

module.exports = ClientController;
