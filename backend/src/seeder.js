const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Admin = require('./models/Admin');
const Category = require('./models/Category');
const Product = require('./models/Product');
const WebsiteSettings = require('./models/WebsiteSettings');

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await Admin.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await WebsiteSettings.deleteMany();

    await Admin.create({
      email: 'admin@gmaquatech.com',
      password: 'password123'
    });

    const categories = await Category.insertMany([
      { name: 'RO Systems', slug: 'ro-systems' },
      { name: 'RO Membranes', slug: 'ro-membranes' },
      { name: 'RO Pumps', slug: 'ro-pumps' },
      { name: 'Filters', slug: 'filters' }
    ]);

    await Product.insertMany([
      {
        name: 'Industrial RO Plant 1000 LPH',
        slug: 'industrial-ro-plant-1000-lph',
        category: categories[0]._id,
        sku: 'RO-1000-IND',
        shortDescription: 'High capacity 1000 LPH RO plant for industrial use.',
        description: 'Complete description for Industrial RO Plant...',
        isFeatured: true
      },
      {
        name: 'Domestic RO Membrane 100 GPD',
        slug: 'domestic-ro-membrane-100-gpd',
        category: categories[1]._id,
        sku: 'MEM-100-DOM',
        shortDescription: 'High quality 100 GPD membrane for domestic purifiers.',
        description: 'Complete description for membrane...',
        isFeatured: true
      }
    ]);

    await WebsiteSettings.create({
      businessName: 'G M Aquatech',
      phone: '+91 9876543210',
      whatsapp: '+91 9876543210',
      email: 'sales@gmaquatech.com',
      address: '123 Water Park, Industrial Area, New Delhi, India'
    });

    console.log('Data Imported...');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else {
  console.log('Use -i to import data');
  process.exit();
}
