const express = require('express');
const path = require('path');
const fs = require('fs');
const complaintsRouter = require('./routes/complaintsRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

// Serve frontend static files
const DIST_DIR = path.join(__dirname, '..', 'frontend', 'dist');
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
if (fs.existsSync(DIST_DIR)) app.use(express.static(DIST_DIR));
else app.use(express.static(FRONTEND_DIR));
app.use(express.static(path.join(__dirname, '..')));

// API routes
app.use('/api/complaints', complaintsRouter);

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// Error handler (should be last)
app.use(errorHandler);

module.exports = app;