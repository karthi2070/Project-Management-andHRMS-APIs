const EmployeeModel = require('../models/empolyeeModel');

const EmployeeController = {

    async createEmployee(req, res, next) {
        try {
            const {
                user_id,name, phone, mail, dob, doj, department, designation, salary, status,
                status_reson, status_desc,relieving_date, pan, aadhar, education, address, city, state,
                pincode, p_address, p_city, p_state, p_pincode,emergency_name,emergency_phone,emergency_relation
            } = req.body;

            // Get count from DB instead of list (to avoid memory load and concurrency issue)
            const count = await EmployeeModel.getEmployeeCount();
            const employee_id = `NT00${count + 1}`;

            const employeeData = {
                user_id,name, employee_id, phone, mail, dob, doj, department, designation, salary, status,
                status_reson, status_desc,relieving_date, pan, aadhar, education, address, city, state,
                pincode, p_address, p_city, p_state, p_pincode,emergency_name,emergency_phone,emergency_relation
            };

            const result = await EmployeeModel.createEmployee(employeeData);
            res.status(201).json({ message: 'Employee created successfully', data: result });
        } catch (error) {
            next(error);
        }
    },
    async getEmployeeByEmpId(req, res,next) {
        try {
            const { employee_id } = req.params;
            console.log("Fetching employee with employee_id:", employee_id);

            const result = await EmployeeModel.getEmployeeByEmpId(employee_id);

            if (!result) {
                return res.status(404).json({ message: "Employee not found" });
            }

            res.status(200).json(result);
        } catch (error) {
            next()
        }
    },

    async getEmployeeByUserId(req, res,next) {
        try {
            const { user_id } = req.params;
            console.log("Fetching employee with employee_id:", user_id);

            const result = await EmployeeModel.getEmployeeByUserId(user_id);

            if (!result) {
                return res.status(404).json({ message: "Employee not found" });
            }

            res.status(200).json(result);
        } catch (error) {
            next()
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
       async relievingEmployee(req, res, next) {
        try {
            const updatedEmployee = await EmployeeModel.relievingEmployee(req.params.id, req.body);
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

    async getFilteredDepartment(req, res, next) {
        try {
            const department = req.query.department;
            const employees = await EmployeeModel.getFiltereddepart(department);
            res.status(200).json(employees);
        } catch (error) {
           next(error);        }
    },
    async employeeStatus(req, res, next) {
        try {   
            const { id, status } = req.body;
            const result = await EmployeeModel.employeeStatus(id, status);
            res.status(200).json(result);
        } catch (error) {
           next(error);        
        }
    },
    async getSortByEmployee(req, res, next) {
        try {
            const field = req.query.field;
            if (!field) {
                return res.status(400).json({ message: 'Field parameter is required' });}
            const employees = await EmployeeModel.getSortByEmployee(field);
            res.status(200).json(employees);
        } catch (error) {
           next(error);        }
    },

    async searchEmployee(req, res, next) {      
        try {
            const name = req.query.name;
            const employees = await EmployeeModel.seachemployee(name);
            res.status(200).json(employees);
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
