require('dotenv').config();
const express = require('express');
const cors = require('cors');
const deviceRoutes = require('./routes/deviceRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/devices', deviceRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const reportRoutes = require('./routes/reportRoutes');
app.use('/api/report', reportRoutes);

const emailRoutes = require('./routes/emailRoutes');
app.use('/api/email', emailRoutes);