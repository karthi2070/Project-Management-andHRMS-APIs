const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your email password or app-specific password
  }
});

module.exports = transporter;
// const multer = require('multer');
// const nodemailer = require('nodemailer');
// const path = require('path');
// require('dotenv').config();

// // Configure Multer for PDF uploads
// const storage = multer.diskStorage({
//   destination: '../uploads/',
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const filetypes = /pdf/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Error: File upload only supports PDF format!'));
//   },
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// });

// // Email templates
// const emailTemplates = {
//   internship: {
//     subject: "Welcome to the Internship Program!",
//     html: (name) => `
//       <p>Hi ${name},</p>
//       <p>We’re excited to welcome you to our internship program. Get ready for an amazing journey!</p>
//       <p>Best regards,<br/>HR Team</p>
//     `
//   },
//   internship_complete: {
//     subject: "Internship Completion Certificate",
//     html: (name) => `
//       <p>Hi ${name},</p>
//       <p>Congratulations on completing your internship! Attached is your certificate.</p>
//       <p>Best regards,<br/>HR Team</p>
//     `
//   },
//   invoice: {
//     subject: "Your Invoice",
//     html: (name) => `
//       <p>Hi ${name},</p>
//       <p>Please find your invoice attached. Let us know if you have any questions.</p>
//       <p>Best regards,<br/>Finance Team</p>
//     `
//   },
//   quotation: {
//     subject: "Your Quotation",
//     html: (name) => `
//       <p>Hi ${name},</p>
//       <p>Attached is the quotation you requested. We look forward to your response.</p>
//       <p>Best regards,<br/>Sales Team</p>
//     `
//   }
// };

// // Nodemailer transporter configuration
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Replace with your email service
//   auth: {
//     user: process.env.EMAIL_USER, // Your email
//     pass: process.env.EMAIL_PASS  // Your email password or app-specific password
//   }
// });

// const express = require('express');
// const app = express();

// // Route to handle email sending with PDF attachment
// app.post('/send-email', upload.single('pdfFile'), async (req, res,file ) => {
//   try {
//     const { name, mail, subject, message, type } = req.body;
    
//     // Validate required fields
//     if (!name || !mail || !type) {
//       return res.status(400).json({ error: 'Missing required fields: name, mail, or type' });
//     }
    
//     // Validate email type
//     if (!emailTemplates[type]) {
//       return res.status(400).json({ error: 'Invalid email type' });
//     }
    
//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(mail)) {
//       return res.status(400).json({ error: 'Invalid email format' });
//     }
    
//     // Get email template
//     const template = emailTemplates[type];
    
//     // Prepare email options
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: mail,
//       subject: subject || template.subject,
//       html: message ? `<p>${message}</p>` : template.html(name),
//       attachments: []
//     };
    
//     // Add PDF attachment if provided
//     if (req.file) {
//       mailOptions.attachments.push({
//         filename: req.file.originalname,
//         path: req.file.path
//       });
//     }
    
//     // Send email
//     await transporter.sendMail(mailOptions);
    
//     res.json({ message: 'Email sent successfully' });
//   } catch (error) {
//     //res.status(500).json({ message: 'Error filtering expenses', error });
//     console.error('Error:', error.message);
//     // res.status(500).json({ message: 'Error filtering expenses', error });
//     // res.status(500).json({ error: 'Failed to send email' });
//   }
// });

// module.exports = app;