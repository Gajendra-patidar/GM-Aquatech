const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.send('G M Aquatech API is running...');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/faqs', require('./routes/faqRoutes'));
app.use('/api/contact-messages', require('./routes/contactMessageRoutes'));
app.use('/api/settings', require('./routes/websiteSettingsRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
