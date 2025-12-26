const store = require('../services/complaintsStore');

// Validation
function validateCreate(body) {
  if (!body || !body.name || !body.message) {
    const err = new Error('Missing required fields: name and message');
    err.status = 400;
    throw err;
  }
}

// Create new complaint
async function createComplaint(req, res, next) {
  try {
    console.log("📥 Data received:", req.body);

    validateCreate(req.body);

    const created = await store.create(req.body);
    console.log("✅ Complaint saved:", created);

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    console.error("❌ Controller Error:", err.message);
    next(err);
  }
}

// List complaints
async function listComplaints(req, res, next) {
  try {
    const filters = {};
    if (req.query.status) filters.status = Number(req.query.status);
    const items = await store.list(filters);
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
}

// Get single complaint
async function getComplaint(req, res, next) {
  try {
    const item = await store.getById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Complaint not found' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
}

// Update complaint
async function updateComplaint(req, res, next) {
  try {
    const updated = await store.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Complaint not found' });
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
}

// Delete complaint
async function deleteComplaint(req, res, next) {
  try {
    const deleted = await store.remove(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Complaint not found' });
    res.status(204).end();
  } catch (err) { next(err); }
}

module.exports = {
  createComplaint,
  listComplaints,
  getComplaint,
  updateComplaint,
  deleteComplaint
};
