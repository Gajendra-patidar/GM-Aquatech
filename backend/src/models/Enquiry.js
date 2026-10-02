const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  businessName: {
    type: String,
    required: [true, 'Please add a business name']
  },
  mobile: {
    type: String,
    required: [true, 'Please add a mobile number']
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  city: {
    type: String,
    required: [true, 'Please add a city']
  },
  state: {
    type: String,
    required: [true, 'Please add a state']
  },
  product: {
    type: String,
    required: [true, 'Please specify the product of interest']
  },
  quantity: {
    type: String,
    required: [true, 'Please specify quantity']
  },
  message: {
    type: String
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'],
    default: 'New'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
