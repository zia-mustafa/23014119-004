const Complaint = require('../models/Complaint');

async function create(data) {
  const complaint = new Complaint({
    name: data.name,
    message: data.message,
    status: typeof data.status === 'number' ? data.status : 0
  });
  return await complaint.save();
}

async function list(filters = {}) {
  const query = {};
  if (filters.status !== undefined) query.status = filters.status;
  return await Complaint.find(query).sort({ createdAt: -1 });
}

async function getById(id) {
  return await Complaint.findById(id);
}

async function update(id, data) {
  return await Complaint.findByIdAndUpdate(id, data, { new: true });
}

async function remove(id) {
  return await Complaint.findByIdAndDelete(id);
}

module.exports = {
  create,
  list,
  getById,
  update,
  remove
};
