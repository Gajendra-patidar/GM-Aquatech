const express = require('express');
const { getEnquiries, getEnquiry, createEnquiry, updateEnquiry, deleteEnquiry } = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getEnquiries)
  .post(createEnquiry); // Public route

router.route('/:id')
  .get(protect, getEnquiry)
  .put(protect, updateEnquiry)
  .delete(protect, deleteEnquiry);

module.exports = router;
