const fs = require('fs');
const path = require('path');

const generateComponent = (filePath, name) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, `import React from 'react';

const ${name} = () => {
  return (
    <div>
      <h1>${name}</h1>
    </div>
  );
};

export default ${name};
`);
};

const components = [
  ['src/layouts/WebLayout.jsx', 'WebLayout'],
  ['src/layouts/AdminLayout.jsx', 'AdminLayout'],
  ['src/pages/web/Home.jsx', 'Home'],
  ['src/pages/web/About.jsx', 'About'],
  ['src/pages/web/Products.jsx', 'Products'],
  ['src/pages/web/ProductDetails.jsx', 'ProductDetails'],
  ['src/pages/web/Contact.jsx', 'Contact'],
  ['src/pages/web/Enquiry.jsx', 'Enquiry'],
  ['src/pages/admin/Login.jsx', 'Login'],
  ['src/pages/admin/Dashboard.jsx', 'Dashboard'],
  ['src/pages/admin/ManageProducts.jsx', 'ManageProducts'],
  ['src/pages/admin/ManageCategories.jsx', 'ManageCategories'],
  ['src/pages/admin/ManageEnquiries.jsx', 'ManageEnquiries'],
  ['src/pages/admin/ManageSettings.jsx', 'ManageSettings']
];

components.forEach(([file, name]) => generateComponent(file, name));
console.log('Components generated');
