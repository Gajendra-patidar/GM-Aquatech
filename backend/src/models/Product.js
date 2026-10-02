const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  },
  sku: {
    type: String,
    unique: true,
    required: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxLength: [500, 'Description can not be more than 500 characters']
  },
  description: {
    type: String,
    required: true
  },
  specifications: [{
    key: String,
    value: String
  }],
  features: [{
    type: String
  }],
  applications: [{
    type: String
  }],
  images: [{
    type: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  availability: {
    type: String,
    enum: ['In Stock', 'Out of Stock', 'Pre-order'],
    default: 'In Stock'
  },
  seoTitle: {
    type: String
  },
  seoDesc: {
    type: String
  },
  seoKeywords: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
