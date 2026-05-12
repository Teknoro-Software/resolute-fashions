# Backend Setup Guide

## Quick Start

### 1. Install MongoDB
- **Option A**: Local installation - [Download MongoDB Community](https://www.mongodb.com/try/download/community)
- **Option B**: Cloud - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)

### 2. Start MongoDB
If running locally:
```bash
# Windows
mongod

# macOS/Linux
brew services start mongodb-community
```

### 3. Environment Configuration
The `.env.local` file is already created with:
```
MONGODB_URI=mongodb://localhost:27017/resolute-fashions
NODE_ENV=development
```

For MongoDB Atlas, update it to:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/resolute-fashions
NODE_ENV=development
```

### 4. Start Dev Server
```bash
npm run dev
```

API endpoints will be available at `http://localhost:3000/api`

---

## Testing the API

### Using cURL
```bash
# Get all categories
curl http://localhost:3000/api/categories

# Create a category (requires image file)
curl -X POST http://localhost:3000/api/categories \
  -F "name=Electronics" \
  -F "description=All electronic items" \
  -F "image=@/path/to/image.jpg"
```

### Using Postman/Insomnia
1. Import the collection (to be created)
2. Set the base URL to `http://localhost:3000/api`
3. Use the endpoints from `BACKEND_API.md`

---

## File Structure

```
app/
  api/
    categories/
      route.ts          # GET all, POST create
      [id]/
        route.ts        # GET one, PUT update, DELETE
    products/
      route.ts          # GET all, POST create
      [id]/
        route.ts        # GET one, PUT update, DELETE
    banners/
      route.ts          # GET all, POST create
      [id]/
        route.ts        # GET one, PUT update, DELETE
    offers/
      route.ts          # GET all, POST create
      [id]/
        route.ts        # GET one, PUT update, DELETE

lib/
  db.ts                 # MongoDB connection
  models/
    Category.ts         # Category schema
    Product.ts          # Product schema
    Banner.ts           # Banner schema
    Offer.ts            # Offer schema
  upload.ts             # Multer file upload config
  api-client.ts         # Frontend API helper functions

public/
  uploads/              # Image storage directory
```

---

## Next Steps

1. **Create Admin Dashboard** - Build an admin panel to manage categories, products, banners, and offers
2. **Add Authentication** - Implement JWT/session-based auth for admin routes
3. **Search & Filter** - Add advanced filtering to product endpoints
4. **Image Optimization** - Add image resizing and compression
5. **API Documentation** - Generate Swagger/OpenAPI docs

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env.local`
- Verify network access if using MongoDB Atlas

### File Upload Errors
- Check that `/public/uploads/` directory exists
- Verify file size is under 5MB
- Ensure file format is supported (JPEG, PNG, WebP, GIF)

### TypeScript Errors
- Run `npm install` to install all dependencies
- Check that all imports are correct

For more details, see `BACKEND_API.md`
