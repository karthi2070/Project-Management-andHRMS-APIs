const ClientModel = require('../models/clientModel');

const ClientController = {
    async createClient(req, res ,next) {
        try {
            const {user_id,name, company_name, mail, phone1, phone2, phone3, gst_num, address, city, state, pincode}=req.body

            const count = await ClientModel.getTotalClients()
            console.log("count",count)
            const client_id =`CLI000${count+1}`
            const client_data= {user_id,user_id,name, company_name,client_id, mail, phone1, phone2, phone3, gst_num, address, city, state, pincode}
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
async getClientDashboard(req, res, next) {
    try {
      const totalClients = await ClientModel.getTotalClients();
      const pendingPayments = await ClientModel.getPendingPaymentsValue();
      const upcomingClientsCount = await ClientModel.getPendingPaymentsCount();
      const getRenewalClients = await ClientModel.getRenewalClients();

      res.status(200).json({
        total_clients: totalClients,
        total_pending_payment: pendingPayments.total_pending_payment,
        upcomingClientsCount: upcomingClientsCount.upcoming_due_clients_count,
        upcomingClientsId: upcomingClientsCount.upcoming_due_clients_ids,
        renewalClientsCount: getRenewalClients.renewal_clients_count,
        renewalClientsId: getRenewalClients.clients_renewal_id
            //     res.status(200).json({
    //     total_clients: totalClients,
    //     total_pending_payment: pendingPayments.total_pending_payment,
    //     upcomingClientsCount: upcomingClientsCount,
    //     renewalClientsCount: getRenewalClients
    //   });
      });
    } catch (error) {
      next(error);
    }
  },

    // Invoice Methods
    async createInvoice(req, res, next) {
        try {
            const {user_id, service_name, client_id, invoice_amount, paid_amount,
                 balance_amount, status_id, invoice_date, followup_date, service_renewal_date, payment_method, notes } = req.body;

             const count = await ClientModel.getTotalInvoice()
            const invoice_number =`INC000${count+1}`
            const invoiceData = { user_id, service_name, client_id, invoice_number, invoice_amount, paid_amount,
                 balance_amount, status_id, invoice_date, followup_date, service_renewal_date, payment_method, notes }
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
    async findInvoiceById(req, res, next) {
        try {
            const {client_id,invoice_id} =req.params
            const invoice = await ClientModel.findById(client_id,invoice_id);
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
    },
//EMI pyments findEMIPymentInvoiceById

    async findEMIPymentInvoiceId(req, res, next) {
        try {
            const {client_id,invoice_id} =req.params
            console.log(client_id,invoice_id)
            const invoice = await ClientModel.findEMIPymentInvoiceId(client_id,invoice_id);
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
            const {invoice_id,id} =req.params
            const invoice = await ClientModel.findEMIPymentInvoiceById(invoice_id,id);
            if (!invoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json(invoice);
        } catch (error) {
            next(error);
        }
    },
async recordEMIPayment   (req, res, next)  {
  try {
    const invoice_id = parseInt(req.params.invoice_id);
    const { client_id, payment_amount,payment_date, payment_method, payment_status, notes } = req.body;

    // Step 1: Fetch invoice
    const invoice = await ClientModel.getInvoiceById(invoice_id);
    console.log(invoice)
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
//client_id, invoice_number, invoice_amount, paid_amount, balance_amount,status_id, invoice_date, due_date, payment_method, notes
    const invoiceAmount = Number(invoice.invoice_amount);
    const currentPaid = Number(invoice.paid_amount);
    const newTotalPaid = currentPaid + Number(payment_amount);
    let balanceAmount = invoiceAmount - newTotalPaid;

    let extra_amount = 0;
    if (balanceAmount < 0) {
      extra_amount = Math.abs(balanceAmount);
      balanceAmount = 0;
    }

    // Step 2: Insert payment
    await ClientModel.insertPayment({
      client_id,
      invoice_id,
      payment_amount,
      payment_date,
      payment_method,
      payment_status,
      notes,
      extra_amount
    });

    // Step 3: Update invoice only if payment is successful (e.g., 1 = success)
    if (Number(payment_status) === 1) {
      const newStatusId = newTotalPaid >= invoiceAmount ? 2 : 3; // 2 = partial, 3 = paid

    const  updateInvoiseData={paid_amount: newTotalPaid,balance_amount: balanceAmount,extra_amount:extra_amount,status_id: newStatusId,id :invoice_id}
      await ClientModel.updateInvoiceTotals(updateInvoiseData);
    }

    return res.status(200).json({
      message: 'Payment recorded',
      paid_amount: newTotalPaid,
      balance_amount: balanceAmount,
      payment_date,
      extra_amount,
      payment_status
    });

  } catch (err) {
    next(err); 
  }

}

};

module.exports = ClientController;
