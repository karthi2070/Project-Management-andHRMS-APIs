const emailTemplates = {
  internship: {
    subject: 'ternship Offer Letter from Namuvi Technologies',
    html: (name, startDate, endDate) => `

       <p>Dear ${name},</p>

<p> We are pleased to offer you an internship opportunity with Namuvi Technologies Private Limited. This internship will 
commence on ${startDate} and will continue for a duration of ${endDate}.</p>
You will be working on real-time projects under the guidance of our experienced professionals, gaining valuable exposure to the tech industry.</p>

<p> Please find the detailed internship offer letter attached. Kindly review, sign, and return a copy to confirm your acceptance.</p>

<p>For any queries, feel free to reach out to us at +91 9962744380.</p>

<p>Best regards,<br/>
Namuvi HR Team
Namuvi Technologies Private Limited </p>

    `
  },
  internship_complete: {
    subject: ' nternship Completion Confirmation – Namuvi Technologies ',
    html: (name) => `
      <p>Dear ${name},</p>


     <p> Congratulations on successfully completing your internship with Namuvi Technologies Private Limited from ${startDate} to ${endDate}.
<p>We appreciate your contributions and dedication throughout the program. Please find your internship completion certificate attached.</p>

<p>Should you require further assistance or references, feel free to contact us at +91 9962744380.</p>

<p>Best wishes for your future endeavors!</p>

<p>Best regards,<br/>
Namuvi Technologies Private Limited </p>

    `
  },
  PaidInternship: {
    subject: 'Paid Internship Offer – Namuvi Technologies',
    html: (name, startDate, amount, responsibilities) => `

      <p>Dear ${name},</p>
      <p>We are pleased to inform you that you have been selected for a paid internship position at Namuvi Technologies Private Limited, starting from <strong>${startDate}</strong>.</p>
      <p>You will receive a monthly stipend of <strong>₹${amount}</strong>, and your role will include ${responsibilities}.</p>
      <p>Kindly find the offer details attached. For any queries, contact us at +91 9962744380.</p>
      <p>Looking forward to your confirmation.</p>
      <p>Sincerely,<br/>Namuvi HR Team<br/>Namuvi Technologies Private Limited</p>
    `
  },
  employeeOffer:{
    subject: 'Job Offer from Namuvi Technologies',
    html: (name, position, startDate) => `
      <p>Dear ${name},</p>
      <p>We are excited to offer you the position of <strong>${position}</strong> at Namuvi Technologies Private Limited, starting on <strong>${startDate}</strong>.</p>
      <p>Please find the detailed offer letter attached. We look forward to having you on our team.</p>
      <p>If you have any questions, feel free to reach out at +91 9962744380.</p>
      <p>Best regards,<br/>Namuvi HR Team<br/>Namuvi Technologies Private Limited</p>
    `
    ``
  },
  invoice: {
    subject: 'Your Invoice',
    html: (name,amount,date) => `
      <p>dear ${name},</p>

<p>
Please find attached the invoice #[Invoice Number] dated [Date] for the services rendered by Namuvi Technologies Private Limited.

- Amount: ${amount}
- Due Date: ${date}

Kindly process the payment at your earliest convenience. For queries, contact us at +91 9962744380.

Thank you for your continued business.</p>

<p>Warm regards,<br>
Namuvi Accounts Team
Namuvi Technologies Private Limited
</p>`
  },
  quotation: {
    subject: 'Your Quotation',
    message : (name, amount, date) => `
      <p>dear ${name},</p>

<p>
Please find attached the invoice #[Invoice Number] dated [Date] for the services rendered by Namuvi Technologies Private Limited.

- Amount: ${amount}
- Due Date: ${date}

Kindly process the payment at your earliest convenience. For queries, contact us at +91 9962744380.

Thank you for your continued business.</p>

<p>Warm regards,<br>
Namuvi Accounts Team
Namuvi Technologies Private Limited
</p> `
  }
      
};

module.exports = emailTemplates;