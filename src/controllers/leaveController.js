const EmployeeLeaveModel = require("../models/leaveModel");

const EmployeeLeaveController = {
  async create(req, res, next) {
    try {
      const result = await EmployeeLeaveModel.createLeave(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },

  async getAll(req, res, next) {
    try {
      const result = await EmployeeLeaveModel.getAllLeaves();
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
  async getemployeeLeaves(req, res, next) {
    try {
      const {id,is_applicable}=req.params
      const result = await EmployeeLeaveModel.getemployeeLeaves(id,is_applicable);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
  async getById(req, res, next) {
    try {
      const result = await EmployeeLeaveModel.getLeaveById(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const result = await EmployeeLeaveModel.updateLeave(req.params.id, req.body);
      res.json({ message: "Leave updated", result });
    } catch (err) {
      next(err);
    }
  },

  async softDelete(req, res, next) {
    try {
      const result = await EmployeeLeaveModel.softDeleteLeave(req.params.id);
      res.json({ message: "Leave soft deleted", result });
    } catch (err) {
      next(err);
    }
  },

  async updateApplicable(req, res, next) {
    try {
      const {is_applicable,reason}=req.body
      
      const result = await EmployeeLeaveModel.updateIsApplicable(req.params.id,is_applicable,reason);
      res.json({ message: "is_applicable updated", result });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = EmployeeLeaveController;

