const EmployeeModel = require('../models/empolyeeModel');

const EmployeeController = {
    async createEmployee(req, res,next) {
        try {
            const employee = await EmployeeModel.createEmployee(req.body);
            res.status(201).json(employee);
        } catch (error) {
            next(error);
            
        }
    },

    async getAllEmployees(req, res,next) {
        try {
            const employees = await EmployeeModel.getAllEmployees();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching employees', error });
        }
    },

    async getEmployeeById(req, res, next) {
        try {
            const employee = await EmployeeModel.getEmployeeById(req.params.id);
            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }
            res.status(200).json(employee);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching employee', error });
        }
    },

    async updateEmployee(req, res, next) {
        try {
            const updatedEmployee = await EmployeeModel.updateEmployee(req.params.id, req.body);
            res.status(200).json(updatedEmployee);
        } catch (error) {
           next(error);        }
    },

    async softDeleteEmployee(req, res, next) {
        try {
            const deletedEmployee = await EmployeeModel.softDeleteEmployee(req.params.id);
            res.status(200).json(deletedEmployee);
        } catch (error) {
           next(error);        }
    },

    // Bank Details Methods
    async createBankDetails(req, res, next) {
        try {
            const bank = await EmployeeModel.createBankDetails(req.body);
            res.status(201).json(bank);
        } catch (error) {
           next(error);        }
    },

    async getAllBankDetails(req, res, next) {
        try {
            const banks = await EmployeeModel.getAllBankDetails();
            res.status(200).json(banks);
        } catch (error) {
           next(error);        }
    },

    async getBankDetailsById(req, res, next) {
        try {
            const bank = await EmployeeModel.getBankDetailsById(req.params.id);
            if (!bank) {
                return res.status(404).json({ message: 'Bank details not found' });
            }
            res.status(200).json(bank);
        } catch (error) {
           next(error);        }
    },

    async updateBankDetails(req, res, next) {
        try {
            const updatedBank = await EmployeeModel.updateBankDetails(req.params.id, req.body);
            res.status(200).json(updatedBank);
        } catch (error) {
                      next(error);
        }
    },

    async softDeleteBankDetails(req, res, next) {
        try {
            const deletedBank = await EmployeeModel.softDeleteBankDetails(req.params.id);
            res.status(200).json(deletedBank);
        } catch (error) {
           next(error);
        }
    }

};

module.exports = EmployeeController;

// const BankModel = require('../models/bankModel');

// const BankController = {
    
// };

// module.exports = BankController;
