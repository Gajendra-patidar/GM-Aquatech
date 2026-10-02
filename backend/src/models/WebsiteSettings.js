const mongoose = require('mongoose');

const websiteSettingsSchema = new mongoose.Schema({
  businessName: { type: String, default: 'G M Aquatech' },
  logo: { type: String },
  favicon: { type: String },
  phone: { type: String },
  whatsapp: { type: String },
  email: { type: String },
  address: { type: String },
  mapUrl: { type: String },
  businessHours: { type: String },
  
  socialLinks: {
    facebook: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    linkedin: { type: String }
  },
  
  seo: {
    title: { type: String, default: 'G M Aquatech - RO Wholesale Partner' },
    description: { type: String },
    keywords: { type: String },
    openGraphImage: { type: String },
    googleAnalyticsId: { type: String }
  },
  
  footerText: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('WebsiteSettings', websiteSettingsSchema);
