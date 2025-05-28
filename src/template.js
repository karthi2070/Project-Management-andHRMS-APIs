const emailTemplates = {
  internship: {
    subject: 'Welcome to the Internship Program!',
    html: (name) => `
      <p>Hi ${name},</p>
      <p>We’re excited to welcome you to our internship program. Get ready for an amazing journey!</p>
      <p>Best regards,<br/>HR Team</p>
    `
  },
  internship_complete: {
    subject: 'Internship Completion Certificate',
    html: (name) => `
      <p>Hi ${name},</p>
      <p>Congratulations on completing your internship! Attached is your certificate.</p>
      <p>Best regards,<br/>HR Team</p>
    `
  },
  invoice: {
    subject: 'Your Invoice',
    html: (name) => `
      <p>Hi ${name},</p>
      <p>Please find your invoice attached. Let us know if you have any questions.</p>
      <p>Best regards,<br/>Finance Team</p>
    `
  },
  quotation: {
    subject: 'Your Quotation',
    html: (name) => `
      <p>Hi ${name},</p>
      <p>Attached is the quotation you requested. We look forward to your response.</p>
      <p>Best regards,<br/>Sales Team</p>
    `
  }
};

module.exports = emailTemplates;