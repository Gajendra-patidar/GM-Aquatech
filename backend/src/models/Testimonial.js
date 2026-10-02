const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Please add a customer name']
  },
  companyName: {
    type: String
  },
  image: {
    type: String,
    default: 'no-photo.jpg'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  content: {
    type: String,
    required: [true, 'Please add testimonial content']
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

module.exports = mongoose.model('Testimonial', testimonialSchema);
