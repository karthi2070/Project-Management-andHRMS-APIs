const express = require('express');
const router = express.Router();
const controller = require('../controllers/paySlipController');

router.get('/templates/get-all',controller.listAllTemplates)
router.get('/templates/get-by-id/:id', controller.getTemplateById);
router.get('/templates/get-by-id-temp-comp/:id', controller.getTemplateByIdWithComponents);
router.post('/templates/create-template', controller.insertTemplate);
router.put('/templates/update-template/:id', controller.updateTemplate);
router.patch('/templates/delete-template/:id', controller.softDeleteTemplate); 

router.post('/templates/salary-template',controller.createPayslipTemplateWithComponents)
router.put('/templates/update-salary-template/:template_id', controller.updateTemplateWithComponents);



router.get('/components/get-by-id/:template_id', controller.getAllComponentsByTemplateId);
router.post('/components/create-components', controller.insertComponents);
router.put('/components/update-components/:id', controller.updateComponent);
router.patch('/components/delete-components/:id', controller.softDeleteComponent);

router.get('/get-all', controller.getAllPayslip);
router.get('/get-by-userid-month', controller.getpayslipByMonth);
router.post('/salary-history', controller.createSalaryHistory);
router.put('/salary-history-update/:id',controller. updateSalaryHistory);
router.get('/get-salary-history-user-id/:id',controller.getSalaryHistoryByUserId)

router.post('/genpayslip',controller.genpayslip)

module.exports = router;
