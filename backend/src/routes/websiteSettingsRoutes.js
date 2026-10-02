const express = require('express');
const { getSettings, updateSettings } = require('../controllers/websiteSettingsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getSettings)
  .put(protect, updateSettings);

module.exports = router;
