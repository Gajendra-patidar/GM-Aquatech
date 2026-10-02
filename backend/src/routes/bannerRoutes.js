const express = require('express');
const { getAll, getOne, create, update, deleteData } = require('../controllers/bannerController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getAll) // Adjust protection in index.js if needed
  .post(protect, create);

router.route('/:id')
  .get(getOne)
  .put(protect, update)
  .delete(protect, deleteData);

module.exports = router;
