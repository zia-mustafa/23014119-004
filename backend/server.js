require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const complaintRoutes = require('./routes/complaintsRoutes');

const app = express();

// 1. Connect to MongoDB
connectDB();

// 2. Middlewares
app.use(cors());
app.use(express.json());

// 3. Routes
app.use('/api/complaints', complaintRoutes);

// 4. Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
