const holidaysModel = require('../models/holidayModel');

const holidaysController = {
    createHoliday: async (req, res, next) => {
        try {
            const result = await holidaysModel.createHoliday(req.body);
            res.status(201).json({ message: 'Holiday created', id: result.insertId });
        } catch (error) {
            next(error);
        }
    },

    getAllHolidays: async (req, res, next) => {
        try {
            const holidays = await holidaysModel.getAllHolidays();
            res.json(holidays);
        } catch (error) {
            next(error);
        }
    },

    getHolidayById: async (req, res, next) => {
        try {
            const holiday = await holidaysModel.getHolidayById(req.params.id);
            if (!holiday) return res.status(404).json({ message: 'Holiday not found' });
            res.json(holiday);
        } catch (error) {
            next(error);
        }
    },

    updateHoliday: async (req, res, next) => {
        try {
            const result = await holidaysModel.updateHoliday(req.params.id, req.body);
            res.json({ message: 'Holiday updated' });
        } catch (error) {
            next(error);
        }
    },

    deleteHoliday: async (req, res, next) => {
        try {
            await holidaysModel.deleteHoliday(req.params.id);
            res.json({ message: 'Holiday deleted' });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = holidaysController;
