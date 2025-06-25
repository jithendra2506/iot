// backend/routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const sendReportEmail = require('../utils/sendMail');
const generateReport = require('../utils/generateReport'); // ✅ Import the report generator

router.post('/send-report', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).send("Email is required.");

  try {
    await generateReport();           // ✅ 1. Generate fresh PDF from DB
    await sendReportEmail(email);     // ✅ 2. Send it as attachment
    res.status(200).send("Report sent successfully.");
  } catch (err) {
    console.error("❌ Error in sending report:", err);
    res.status(500).send("Failed to send report.");
  }
});

module.exports = router;