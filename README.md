# G M Aquatech - B2B Promotional Website

A complete, production-ready MERN stack application tailored for an RO/Water Purifier wholesale business.

## Tech Stack
- **Frontend**: React 18, Tailwind CSS, React Router, Framer Motion, Vite
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Auth, Multer, Cloudinary

## Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on port 27017, or a MongoDB Atlas URI)
- Cloudinary Account (for image uploads)

## Project Setup

### 1. Backend Setup
1. Open terminal and navigate to the \`backend\` directory:
   \`\`\`bash
   cd backend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a \`.env\` file based on \`.env.example\` and update variables:
   \`\`\`
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/gmaquatech
   JWT_SECRET=your_super_secret_jwt_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   \`\`\`
4. Seed the database with sample data (Ensure MongoDB is running):
   \`\`\`bash
   npm run seed -- -i
   \`\`\`
5. Start the backend server:
   \`\`\`bash
   npm run dev
   \`\`\`

### 2. Frontend Setup
1. Open a new terminal and navigate to the \`frontend\` directory:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a \`.env\` file in the frontend directory (if not exists) and add:
   \`\`\`
   VITE_API_URL=http://localhost:5000/api
   \`\`\`
4. Start the frontend development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Admin Access
After running the seeder script, an admin account will be created automatically.
- **URL**: \`http://localhost:5173/admin/login\`
- **Email**: \`admin@gmaquatech.com\`
- **Password**: \`password123\`

## Features Implemented
- **Public Website**: Home, Products Listing, Product Details, Wholesale Enquiry, Contact Us.
- **Admin Panel**: Dashboard, Category Management, Product Management, Enquiry tracking, Auth system.
- **Responsive Design**: Mobile-first Tailwind CSS classes.
- **Animations**: Framer Motion for smooth UI transitions.
- **API**: Full REST API built with Express and connected to MongoDB.
- **WhatsApp Integration**: Dynamic WhatsApp message generation for each product.

## Deployment
For production deployment:
1. Update \`MONGO_URI\` to use MongoDB Atlas.
2. Build frontend using \`npm run build\` inside the \`frontend\` folder.
3. Host the built static files using the Express backend, or host frontend on Vercel/Netlify and backend on Render/Railway.
