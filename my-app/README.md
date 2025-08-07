# Photography Portfolio Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB account
- Cloudinary account

## Installation Steps

### 1. Clone/Download the Project
```bash
git clone [repository-url]
cd PhotograhyPortfolio/my-app
npm install
```

### 2. Environment Variables Setup
Create a `.env.local` file in the `my-app` directory with these variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# NextJS
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Add any other environment variables your project uses
```

### 3. Database Setup
- Create a MongoDB Atlas account
- Create a new cluster
- Get your connection string
- Add it to `MONGODB_URI` in `.env.local`

### 4. Cloudinary Setup
- Create a Cloudinary account
- Go to Dashboard to get your credentials
- Add them to the `.env.local` file

### 5. Run the Project
```bash
npm run dev
```

Visit `http://localhost:3000`

## Customization Guide

### Change Project Branding
1. Update site title in `next.config.js`
2. Replace logo/favicon in `public` folder
3. Update metadata in `app/layout.tsx`

### Modify Image Upload Settings
Edit compression settings in `addImageForm.tsx`:
```tsx
const options = {
    maxSizeMB: 0.8,        // Change max file size
    maxWidthOrHeight: 2400, // Change max dimensions
    useWebWorker: true,
    fileType: 'image/webp',
};
```

### Database Schema
Update the image schema in your models if needed to match your requirements.