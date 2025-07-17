const express = require('express');
const router = express.Router();
const controller = require('../controllers/paySlipController');

router.get('/templates/get-by-id/:id', controller.getTemplateById);
router.get('/templates/get-by-id-temp-comp/:id', controller.getTemplateByIdWithComponents);
router.post('/templates/create-template', controller.insertTemplate);
router.put('/templates/update-template/:id', controller.updateTemplate);
router.patch('/templates/delete-template/:id', controller.softDeleteTemplate); 
router.post('/templates/salary-template',controller.createPayslipTemplateWithComponents)
router.get('/templates/payslip/get-by-userid', controller.getgenpayslip);


router.get('/componets/get-by-id/:id', controller.getAllComponentsByTemplateId);
router.post('/compoents/create-compoents', controller.insertComponents);
router.put('/componts/update-compoents/:id', controller.updateComponent);
router.patch('/componts/delete-compoents/:id', controller.softDeleteComponent);

router.post('/salary-history', controller.createSalaryHistory);
router.put('/salary-history-update/:id',controller. updateSalaryHistory);
router.get('/get-salary-history-user-id/:id',controller.getSalaryHistoryByUserId)

router.post('/payslip/genpayslip',controller.genpayslip)

module.exports = router;
