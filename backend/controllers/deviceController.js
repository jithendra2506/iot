const pool = require('../db');
const getAllDevices = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM devices ORDER BY timestamp DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving devices");
  }
};

const addDevice = async (req, res) => {
  const { temp, humidity, status, timestamp } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO devices (temp, humidity, status, timestamp) VALUES ($1, $2, $3, $4) RETURNING *',
      [temp, humidity, status, timestamp]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("🚨 REAL ERROR:", err.message); 
    res.status(500).send("Error adding device");
  }
};

module.exports = { getAllDevices, addDevice };