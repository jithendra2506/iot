const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const stream = require("stream");

router.post("/send-report", async (req, res) => {
  try {
    const { to, devices } = req.body;

    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(buffers);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "yourgmail@gmail.com",
          pass: "your-app-password" 
        }
      });

      await transporter.sendMail({
        from: "yourgmail@gmail.com",
        to,
        subject: "Device Report",
        text: "Attached is your device report.",
        attachments: [
          {
            filename: "report.pdf",
            content: pdfBuffer,
            contentType: "application/pdf",
          },
        ],
      });

      res.status(200).json({ success: true });
    });

    doc.fontSize(20).text("Device Report", { align: "center" });
    doc.moveDown();

    devices.forEach((device, index) => {
      doc.fontSize(12).text(
        `${index + 1}. ID: ${device.id}, Temp: ${device.temp}°C, Humidity: ${device.humidity}%, Status: ${device.status}, Time: ${device.timestamp}`
      );
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error("Failed to send report:", error);
    res.status(500).json({ success: false, error: "Report failed" });
  }
});

module.exports = router;