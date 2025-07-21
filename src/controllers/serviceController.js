const serviceModel = require('../models/serviceModel');
const service =require('../services/serviceService')

const serviceController = {
    async createService(req, res, next) {
        try {
            const data = req.body;

            const service = await serviceModel.create(data);
            res.status(201).json({ success: true, message: 'Service created', service });
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
            const data = await serviceModel.paymentUpdate(id, status);
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

async upcomingPaymentDue (req, res, next)  {
  try {
     const days = parseInt(req.query.days) || 30; 
    if (typeof days !== 'number' || days <= 0){
          return res.status(400).json({ success: false, message: 'Invalid days value' }); }
   // fallback to 30 if not provided
    const { clientCount, clients } = await service.getUpcomingPayments(days);

    if (!clients || clients.length === 0) {
      return res.status(404).json({ success: false, message: 'No upcoming payments found' });
    }

    return res.status(200).json({
      success: true,
      upcoming_due_clients_count: clientCount,
      client_data: clients
    });
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
    },

    // record EMI payment
     // const serviceAmount = Number(service.service_amount);
            // const currentPaid = Number(service.paid_amount);
            // const newTotalPaid = currentPaid + Number(payment_amount);
            // let balanceAmount = serviceAmount - newTotalPaid;
            // let extra_amount = 0;
            // if (balanceAmount < 0) {
            //     extra_amount = Math.abs(balanceAmount);
            //     balanceAmount = 0;
            // }
    async recordServiceEMIPayment(req, res, next) {
        try {
            const service_id = parseInt(req.params.service_id);
            // const user_id = parseInt(req.params.user_id);
            if (!service_id) {
                return res.status(400).json({ message: 'Service ID  required' });
            }
            const { user_id, client_id, payment_amount,paid_amount, payment_date, payment_method, payment_status, next_due_date, followup_date, notes, } = req.body;
            console.log("recordServiceEMIPayment", req.body)
            const service = await serviceModel.getById(service_id);
            if (!service) {
                return res.status(404).json({ message: 'service not found' });
            }
        
             const result = (paid_amount <= payment_amount) ? paid_amount : payment_amount;

            // service table calculating

            const currentPaid = Number(service.paid_amount);
            const service_balance_amount = Number(service.balance_amount);
            const paidAmount = currentPaid + result;
            const  balanceAmount =service_balance_amount- result  ;
            // Step 2: Insert payment
            await serviceModel.insertServicePayment({
                user_id,
                client_id,
                service_id,
                payment_amount,
                paid_amount,
                balance_amount:(payment_amount - result === 0) ? 0 : (payment_amount - result),
                payment_date,
                payment_method,
                payment_status,
                next_due_date,
                followup_date,
                notes
            })
            // Step 3: Update service only if payment is successful (e.g., 1 = success)
            if ([1,2, 3].includes(Number(payment_status))) {
                console.log(payment_status)
                const newStatusId = paidAmount < service_balance_amount ? 2 : 3; //1 = unpaid, 2 = partial, 3 = paid
                
                const updateServiceData = {
                    user_id,
                    paid_amount: paidAmount,
                    balance_amount: balanceAmount,
                    due_date: next_due_date,
                    payment_status: newStatusId,
                    id: service_id
                }
                await serviceModel.updateServiceTotals(updateServiceData);
            }
            return res.status(200).json({
                message: 'Payment recorded',
                Due_payment:payment_amount,
                paid_amount: result,
                balance_amount: result,
                payment_date,
                payment_status,
                service_paid_amount:paidAmount,
                service_balance_amount:balanceAmount
            });

        } catch (err) {
            next(err);
        }
    },
    async GetServicePaymentByClientIdServiceId(req, res, next) {
        try {
            const { client_id, service_id } = req.params
            const service = await serviceModel.getFollowupPaymentId(client_id, service_id);
            if (!service) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json(service);
        } catch (error) {
            next(error);
        }
    },
    async GetServicePaymentByServiceIdandId(req, res, next) {
        try {
            const { service_id, id } = req.params
            const service = await serviceModel.getFollowupPaymentServiceId(service_id, id);
            if (!service) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json(service);
        } catch (error) {
            next(error);
        }
    },
};

module.exports = serviceController;
