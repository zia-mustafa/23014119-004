const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: Number, default: 0 }, // 0 = pending, 1 = resolved
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
