const transporter = require('../config/nodemailer');
const emailTemplates = require('../template');

const sendEmail = async (req, res) => {
  try {
    const { name, mail, subject, message, type } = req.body;
    
    // Validate required fields
    if (!name || !mail || !type) {
      return res.status(400).json({ error: 'Missing required fields: name, mail, or type' });
    }
    
    // Validate email type
    if (!emailTemplates[type]) {
      return res.status(400).json({ error: 'Invalid email type' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(mail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Get email template
    const template = emailTemplates[type];
    
    // Prepare email options html: message ? `<p>${message}</p>` : template.html(name),
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: mail,
      subject: subject || template.subject,
      html:  template.html(name),
      attachments: []
    };
    
    // Add PDF attachment if provided
    if (req.file) {
      mailOptions.attachments.push({
        filename: req.file.originalname,
        path: req.file.path
      });
    }
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = { sendEmail };