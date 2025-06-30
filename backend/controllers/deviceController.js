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

const deleteDeviceById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM devices WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.status(200).json({ message: "Device deleted successfully" });
  } catch (err) {
    console.error("❌ Failed to delete device:", err);
    res.status(500).json({ error: "Failed to delete device" });
  }
};

module.exports = {
  getAllDevices,
  addDevice,
  deleteDeviceById, 
};