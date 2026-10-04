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

## Production deployment

The frontend is deployed separately on Netlify and the Express API on Render.

### Backend on Render

1. Create or update a Render **Web Service** connected to this repository.
2. Set **Root Directory** to `backend`, **Build Command** to `npm install`, and
   **Start Command** to `npm start`. Render supplies `PORT` automatically.
3. Add these environment variables in Render's service settings:
   - `NODE_ENV=production`
   - `MONGO_URI=<MongoDB Atlas connection string>`
   - `JWT_SECRET=<long, random private secret>`
   - `CORS_ORIGINS=https://gmaquatech.netlify.app`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and
     `CLOUDINARY_API_SECRET` for admin image uploads.
4. In MongoDB Atlas, create a database user and allow the Render service to reach
   the cluster. Never put the Atlas URI or JWT secret in frontend variables or
   source control.
5. After deploy, check `https://gm-aquatech.onrender.com/` and
   `https://gm-aquatech.onrender.com/api/settings`. The API settings endpoint
   should return JSON.

Use an existing admin record or provision one securely in the production
database. Do not run `npm run seed -- -i` against production: that seeder
deletes existing admin, category, product, and settings records before adding
sample data.

### Frontend on Netlify

`netlify.toml` sets the base directory to `frontend`, the build command to
`npm run build`, and the publish directory to `dist`. `frontend/public/_redirects`
rewrites client-side routes to `index.html`, so direct visits to `/admin/login`
and other React Router URLs load the app.

Set this environment variable in Netlify's site settings before deploying:

```text
VITE_API_URL=https://gm-aquatech.onrender.com/api
```

`VITE_` values are included in the public browser bundle; only put the public API
URL there. Never add MongoDB credentials, JWT secrets, or Cloudinary API secrets
to the frontend environment. Trigger a new deploy after changing the variable.
The matching local template is `frontend/.env.example`.

### Production verification

1. Open `https://gmaquatech.netlify.app/admin/login` directly (not just after
   navigating from the homepage). It should return the React app rather than a
   Netlify 404 page.
2. Log in using the credentials for an admin record already provisioned in
   production. The API returns a JWT; the frontend stores it in `localStorage`
   and sends it as a Bearer token. This project does not use cookie-based auth.
3. Verify `/admin`, `/admin/products`, `/admin/categories`, `/admin/enquiries`,
   `/admin/messages`, and `/admin/settings` load while authenticated. Refresh
   each URL to confirm the SPA fallback works.
4. In browser developer tools, confirm API requests go to
   `https://gm-aquatech.onrender.com/api`, succeed without CORS errors, and
   protected requests include an `Authorization: Bearer ...` header.
