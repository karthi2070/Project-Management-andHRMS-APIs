/**
 * @swagger
 * /send-email:
 *   post:
 *     summary: Send an email with an optional PDF attachment
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - mail
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 description: Recipient's name
 *               mail:
 *                 type: string
 *                 description: Recipient's email address
 *               subject:
 *                 type: string
 *                 description: Optional email subject (overrides template subject)
 *               message:
 *                 type: string
 *                 description: Optional email body (overrides template body)
 *               type:
 *                 type: string
 *                 enum: [internship, internship_complete, invoice, quotation]
 *                 description: Email template type
 *               pdfFile:
 *                 type: string
 *                 format: binary
 *                 description: Optional PDF file (max 5MB)
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email sent successfully
 *       400:
 *         description: Bad request (missing fields, invalid email, or invalid type)
 *       500:
 *         description: Server error
 */