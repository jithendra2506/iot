// backend/utils/sendMail.js
const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // 16-char app password
  },
});

const sendReportEmail = async (recipientEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: '📊 Device Report PDF',
    text: 'Please find the attached device report.',
    attachments: [
      {
        filename: 'report.pdf',
        path: path.join(__dirname, '../reports/report.pdf'), // Update path as per your project
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to', recipientEmail);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};

module.exports = sendReportEmail;