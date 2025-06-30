const express = require('express');
const router = express.Router();
const {
  getAllDevices,
  addDevice,
  deleteDeviceById, 
} = require('../controllers/deviceController');

router.get('/', getAllDevices);
router.post('/', addDevice);
router.delete('/:id', deleteDeviceById); 

module.exports = router;