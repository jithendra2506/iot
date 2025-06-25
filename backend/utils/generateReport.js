// backend/utils/generateReport.js
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const db = require("../db");

const generateReport = async () => {
  const doc = new PDFDocument({ margin: 40, size: "A4" });
  const outputPath = path.join(__dirname, "../reports/report.pdf");
  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  // Header
  doc.fontSize(20).text("📊 Device Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`);
  doc.moveDown();

  // Fetch device data
  let result;
  try {
    result = await db.query("SELECT * FROM devices ORDER BY id");
  } catch (err) {
    console.error("❌ Failed to fetch device data:", err);
    doc.text("Error fetching data.");
    doc.end();
    return;
  }

  const devices = result.rows;
  const total = devices.length;
  const online = devices.filter((d) => d.status === "online").length;
  const offline = devices.filter((d) => d.status === "offline").length;

  // Summary
  doc.font("Helvetica-Bold");
  doc.text(`Total Devices: ${total}`);
  doc.text(`Online Devices: ${online}`);
  doc.text(`Offline Devices: ${offline}`);
  doc.moveDown(2);

  // Table Layout
  const tableTop = doc.y;
  const rowHeight = 25;

  const columnWidths = {
    id: 50,
    temp: 90,
    humidity: 100,
    status: 100,
    timestamp: 180,
  };

  const columns = ["ID", "Temp (°C)", "Humidity (%)", "Status", "Timestamp"];
  const columnX = [40, 90, 180, 280, 380];

  // Draw table headers
  doc.font("Helvetica-Bold");
  columnX.forEach((x, i) => {
    doc.rect(x, tableTop, columnWidths[Object.keys(columnWidths)[i]], rowHeight).stroke();
    doc.text(columns[i], x + 5, tableTop + 7);
  });

  // Draw rows
  doc.font("Helvetica");
  let y = tableTop + rowHeight;

  devices.forEach((device, index) => {
    const values = [
      device.id,
      device.temp.toFixed(1),
      device.humidity.toFixed(1),
      device.status,
      new Date(device.timestamp).toLocaleString()
    ];

    columnX.forEach((x, i) => {
      doc.rect(x, y, columnWidths[Object.keys(columnWidths)[i]], rowHeight).stroke();
      doc.text(values[i], x + 5, y + 7, { width: columnWidths[Object.keys(columnWidths)[i]] - 10 });
    });

    y += rowHeight;

    if (y > doc.page.height - 60) {
      doc.addPage();
      y = 40;
    }
  });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => resolve(outputPath));
    writeStream.on("error", reject);
  });
};

module.exports = generateReport;