const EmployeeModel = require('../model/empolyeeModel');

const EmployeeController = {
    async createEmployee(req, res) {
        try {
            const employee = await EmployeeModel.createEmployee(req.body);
            res.status(201).json(employee);
        } catch (error) {
            res.status(500).json({ message: 'Error creating employee', error });
        }
    },

    async getAllEmployees(req, res) {
        try {
            const employees = await EmployeeModel.getAllEmployees();
            res.status(200).json(employees);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching employees', error });
        }
    },

    async getEmployeeById(req, res) {
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

    async updateEmployee(req, res) {
        try {
            const updatedEmployee = await EmployeeModel.updateEmployee(req.params.id, req.body);
            res.status(200).json(updatedEmployee);
        } catch (error) {
            res.status(500).json({ message: 'Error updating employee', error });
        }
    },

    async softDeleteEmployee(req, res) {
        try {
            const deletedEmployee = await EmployeeModel.softDeleteEmployee(req.params.id);
            res.status(200).json(deletedEmployee);
        } catch (error) {
            res.status(500).json({ message: 'Error deleting employee', error });
        }
    }
};

module.exports = EmployeeController;
