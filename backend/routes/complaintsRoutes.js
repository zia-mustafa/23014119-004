const express = require('express');
const router = express.Router();
const controller = require('../controllers/complaintsController');

router.get('/', controller.listComplaints);
router.get('/:id', controller.getComplaint);
router.post('/', controller.createComplaint);
router.put('/:id', controller.updateComplaint);
router.delete('/:id', controller.deleteComplaint);

module.exports = router;
