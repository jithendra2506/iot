const express = require('express');
const router = express.Router();
const {
  getAllDevices,
  addDevice,
} = require('../controllers/deviceController');

router.get('/', getAllDevices);
router.post('/', addDevice);

module.exports = router;