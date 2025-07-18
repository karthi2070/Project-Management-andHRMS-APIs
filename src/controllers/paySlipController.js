const EmployeeModel = require('../models/empolyeeModel');
const paySlipModel = require('../models/paySlipModel');
const PayslipService =require('../services/payslipService')

const PayslipController = {

  async createPayslipTemplateWithComponents(req, res) {
    try {
      const { template, components } = req.body;
      console.log(req.body)

      // Validate
      if (!template || !components || !Array.isArray(components)) {
        return res.status(400).json({ error: 'Invalid request structure' });
      }

      const { template_name, total_percentage } = template;
      console.log("template",template)

      if (!template_name || typeof total_percentage !== 'number') {
        return res.status(400).json({ error: 'Missing template fields' });
      }

      // Step 1: Insert Template
      const insertTemplateData = {
        template_name,
        total_percentage
      };

      const result = await paySlipModel.insertTemplate(insertTemplateData);
      const template_id = result.id;

      // Step 2: Map Components with inserted template_id
      const mappedComponents = components.map((c, index) => ({
        template_id,
        comp_name: c.Comp_name,
        type: c.Type,
        percentage: c.Percentage,
        applicable: c.Applicable
      }));

      // Step 3: Insert components
      await paySlipModel.insertComponents(mappedComponents);

      // Final response
      res.status(201).json({
        message: 'Template and components created successfully',
        template_id,
        total_components: components.length
      });
    } catch (err) {
      console.error('Create Payslip Template Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getAllTemplates(req, res,next) {
    try {
      const templates = await paySlipModel.getAllTemplates();
      const fullData = [];

      for (const template of templates) {
        const components = await paySlipModel.getAllComponentsByTemplateId(template.id);
        fullData.push({
          template: template.template_name,
          components: components.map(c => ({
            Comp_name: c.comp_name,
            Type: c.type,
            Percentage: c.percentage,
            Applicable: c.applicable
          })),
          total_percentage: template.total_percentage
        });
      }

      res.status(200).json(fullData);
    } catch (err) {
      next(err)
    }
  },

  async getTemplateById(req, res,next) {
    try {
      const { id } = req.params;
      const template = await paySlipModel.getTemplateById(id);
      if (!template) 
        return res.status(404).json({ error: 'Template not found' });

      res.status(200).json(template);
    } catch (err) {      
      next(err)
    }
  },
  async getTemplateByIdWithComponents(req, res,next) {
    try {
      const { id } = req.params;
      const template = await paySlipModel.getTemplateByIdWithComponents(id);
      console.log(template)
      if (!template) 
        return res.status(404).json({ error: 'Template not found' });


      res.status(200).json(template);
    } catch (err) {      
      next(err)
    }
  },
  async insertTemplate(req, res,next) {
    try {
      const {template_name, total_percentage} = req.body;
      if ( total_percentage < 100){
        res.status(400).json ({message:'total shoud 100 100%'})
      }
      const result = await paySlipModel.insertTemplate(template_name, total_percentage);
      res.status(201).json({ message: 'Template inserted', ...result });
    } catch (err) {
      next(err)
    }
  },

  async updateTemplate(req, res,next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await paySlipModel.updateTemplate(id, data);
      res.status(200).json({ message: 'Template updated', ...result });
    } catch (err) {
      next(err)    }
  },

  async softDeleteTemplate(req, res) {
    try {
      const { id } = req.params;
      const result = await paySlipModel.softDeleteTemplate(id);
      res.status(200).json({ message: 'Template soft-deleted', ...result });
    } catch (err) {
      next(err)
    }
  },

// commponts
  async getAllComponentsByTemplateId(req, res,next) {
    try {
      const { id } = req.params;
      const components = await paySlipModel.getAllComponentsByTemplateId(id);
      res.status(200).json(components);
    } catch (err) {
  next(err)
    }
  },

  async insertComponents(req, res,next) {
    try {
      const components = req.body;
      const result = await paySlipModel.insertComponents(components);
      res.status(201).json({ message: 'Components inserted', ...result });
    } catch (err) {
      next(err)
    }
  },

  async updateComponent(req, res,next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await paySlipModel.updateComponent(id, data);
      res.status(200).json({ message: 'Component updated', ...result });
    } catch (err) {
      next(err)
    }
  },

  async softDeleteComponent(req, res,next) {
    try {
      const { id } = req.params;
      const result = await paySlipModel.softDeleteComponent(id);
      res.status(200).json({ message: 'Component soft-deleted', ...result });
    } catch (err) {
      next(err)
    }
  },

  //genrate payslip 
   async genpayslip (req,res,next){
    try{
      const { user_id,salary, salary_template_id,start_date, end_date } =req.body;
      if (!salary && !salary_template_id && !user_id){
        return res.status(400).json({message:'requried folleing fileds salary, template_id, user_id '})

      }
      const user = await EmployeeModel.getEmployeeByUserId(user_id)
      if(! user){
        return res.status(400).json({message:'user not found or user deleted'})
      }
      const updateSalaryDetails = await EmployeeModel.updateSalaryDetails(user_id,salary, salary_template_id)
      if(! updateSalaryDetails ){
        return res.status(400).json({message:'salary and template_id not update'})
      } 

     const formattedResponse = await PayslipService.genpaySlip(user_id,start_date, end_date)
      if (!formattedResponse) {
        return res.status(404).json({ success: false, message: "Data not found" });
      }
      res.status(200).json({ success: true, data: formattedResponse });
    }catch(err){
      next(err)
    }
  },
  async getgenpayslip (req,res,next){
    try{
      const {startDate, endDate, id } =req.query;
     const formattedResponse = await paySlipModel.getgenpayslip(startDate, endDate, id);
      if (!formattedResponse) {
        return res.status(404).json({ success: false, message: "Data not found" });
      }
      res.status(200).json({ success: true, data: formattedResponse });
    }catch(err){
      next(err)
    }
  },

  // salary history 

    async createSalaryHistory(req, res, next) {
    try {
      const data = req.body;
      const result = await paySlipModel.createSalaryHistory(data);
      res.status(201).json({ success: true, message: 'Salary history created', id: result.insertId });
    } catch (error) {
      next(error);
    }
  },

  async updateSalaryHistory(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await paySlipModel.updateSalaryHistory(id, data);
      res.status(200).json({ success: true, message: 'Salary history updated', result });
    } catch (error) {
      next(error);
    }
  },
  async getSalaryHistoryByUserId(req,res,next){
    try{
      const {id}=req.params
      const rows =await paySlipModel.getSalaryHistoyByUserId(id);
      res.status(200).json({success :true ,rows });
    }catch(error){
      next(error)
    }
  }
};

module.exports = PayslipController;
