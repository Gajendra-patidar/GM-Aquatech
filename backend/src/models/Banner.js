const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, 'Please add a heading']
  },
  subheading: {
    type: String
  },
  image: {
    type: String,
    required: [true, 'Please add an image']
  },
  ctaText: {
    type: String
  },
  ctaUrl: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Banner', bannerSchema);
