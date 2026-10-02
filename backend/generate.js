const fs = require('fs');

const generateCrud = (modelName, variableName) => {
  const controllerTemplate = `const ${modelName} = require('../models/${modelName}');

exports.getAll = async (req, res) => {
  try {
    const data = await ${modelName}.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const data = await ${modelName}.findById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await ${modelName}.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await ${modelName}.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const data = await ${modelName}.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
`;

  const routeTemplate = `const express = require('express');
const { getAll, getOne, create, update, deleteData } = require('../controllers/${variableName}Controller');
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
`;

  fs.writeFileSync(`src/controllers/${variableName}Controller.js`, controllerTemplate);
  fs.writeFileSync(`src/routes/${variableName}Routes.js`, routeTemplate);
};

['Banner', 'Testimonial', 'FAQ', 'ContactMessage'].forEach(model => {
  generateCrud(model, model.charAt(0).toLowerCase() + model.slice(1));
});
