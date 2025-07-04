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
    async upcomingPaymentDue(req, res, next) {
        try {
            const data = await serviceModel.upcomingPaymentDue();
            if (!data || data.length === 0) {
                return res.status(404).json({ success: false, message: 'No upcoming payments found' });
            }
            res.status(200).json({ success: true, data: data.upcoming_due_clients_count, client_ids: data.clients });
        } catch (error) {
            next(error);
        }
    },
    //

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

    async recordServiceEMIPayment(req, res, next) {
        try {
            const service_id = parseInt(req.params.service_id);
            // const user_id = parseInt(req.params.user_id);
            if (!service_id) {
                return res.status(400).json({ message: 'Service ID  required' });
            }
            const { user_id, client_id, payment_amount, payment_date, payment_method, payment_status, next_due_date,followup_date, notes, } = req.body;
            console.log("recordServiceEMIPayment", req.body)
            const service = await serviceModel.getById(service_id);
            if (!service) {
                return res.status(404).json({ message: 'service not found' });
            }
            const serviceAmount = Number(service.service_amount);
            const currentPaid = Number(service.paid_amount);
            const newTotalPaid = currentPaid + Number(payment_amount);
            let balanceAmount = serviceAmount - newTotalPaid;

            let extra_amount = 0;
            if (balanceAmount < 0) {
                extra_amount = Math.abs(balanceAmount);
                balanceAmount = 0;
            }
            // user_id = 1; // Assuming user_id is from the authenticated user, defaulting to 1 if not available
            // Step 2: Insert payment
            await serviceModel.insertServicePayment({
                user_id,
                client_id,
                service_id,
                payment_amount,
                payment_date,
                payment_method,
                payment_status,
                next_due_date,
                followup_date,
                notes,
                extra_amount
            });
            console.log("payment_status", extra_amount)

            // Step 3: Update service only if payment is successful (e.g., 1 = success)
            if  ([2, 3, 4].includes(Number(payment_status))) {
                console.log(payment_status)
                const newStatusId = newTotalPaid >= serviceAmount ? 3 : 2 ; //1 = unpaid, 2 = partial, 3 = paid

                const updateServiceData = {
                    user_id,
                    paid_amount: newTotalPaid,
                    balance_amount: balanceAmount,
                    due_date: next_due_date,
                    payment_status: newStatusId,
                    id: service_id
                }
                await serviceModel.updateServiceTotals(updateServiceData);
            }

            return res.status(200).json({
                message: 'Payment recorded',
                paid_amount: newTotalPaid,
                balance_amount: balanceAmount,
                payment_date,
                payment_status,
                extra_amount
                
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
