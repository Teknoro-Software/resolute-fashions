# Complete Beginner's Guide - Setup & Run

Follow these steps exactly in order. Don't worry, it's easier than it looks!

---

## Step 1: Choose Your Database

You need to choose ONE option for MongoDB:

### Option A: MongoDB Atlas (Cloud) - RECOMMENDED FOR BEGINNERS ⭐
**Pros:** No installation needed, free tier works great, accessible from anywhere  
**Cons:** Requires internet connection

**Steps:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" button
3. Sign up with your email
4. Create a new project (name it "resolute-fashions")
5. Click "Create a Deployment"
6. Choose "Free Tier"
7. Keep default settings and click "Create"
8. When prompted for username/password:
   - Username: `admin`
   - Password: Make it something simple like `password123` (for testing only!)
   - Click "Create User"
9. Skip the "Where would you like to connect from?" - just click "Finish and Close"
10. Go back to your deployments
11. Click the "Connect" button
12. Choose "Drivers"
13. Copy the connection string (it will look like: `mongodb+srv://admin:password123@cluster0.xxxxx.mongodb.net/`)

**Move to Step 3 (Configure Environment)** with this connection string

---

### Option B: MongoDB Local Installation
**Pros:** Works offline, no account needed  
**Cons:** Need to install and manage locally

#### Windows:
1. Go to https://www.mongodb.com/try/download/community
2. Download the Windows installer (.msi file)
3. Run the installer
4. Click "Next" through all screens
5. When asked about "Service", keep it checked
6. Finish installation
7. MongoDB should start automatically

#### Mac:
```bash
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu):
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Your connection string is:** `mongodb://localhost:27017/resolute-fashions`

**Move to Step 3**

---

## Step 2: Verify Node.js is Installed

Open PowerShell (Windows) or Terminal (Mac/Linux) and run:

```bash
node --version
npm --version
```

You should see version numbers like:
```
v18.17.0
9.8.1
```

**If you don't see version numbers:**
- Download Node.js from https://nodejs.org/ (get the LTS version)
- Install it with default settings
- Restart your terminal

---

## Step 3: Configure Environment Variables

1. Open the project folder in VS Code
2. Look for the `.env.local` file in the root folder
3. Open it and update it:

**If using MongoDB Atlas (Cloud):**
```
MONGODB_URI=mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/resolute-fashions?retryWrites=true&w=majority
NODE_ENV=development
```
Replace `PASSWORD` with your actual password  
Replace `cluster0.xxxxx` with the actual cluster name from your connection string

**If using Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/resolute-fashions
NODE_ENV=development
```

4. Save the file (Ctrl+S)

---

## Step 4: Start the Development Server

1. Open Terminal in VS Code (Ctrl + `)
2. Make sure you're in the project folder
3. Run this command:

```bash
npm run dev
```

You should see something like:
```
> resolute-fashions@0.1.0 dev
> next dev

  ▲ Next.js 16.2.3
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

**This means it's working!** ✅

---

## Step 5: Test the API

Now let's test if everything is working. Open a new terminal (Ctrl + `)

### Test 1: Get all categories (should return empty list)
```bash
curl http://localhost:3000/api/categories
```

You should see:
```
{"success":true,"data":[]}
```

### Test 2: Create a test category
This is a bit more complex. We'll use a tool instead. Go to **Step 6** for easier testing.

---

## Step 6: Use Postman for Easy Testing (Optional but Recommended)

Postman makes it MUCH easier to test your API. Here's how:

### Install Postman:
1. Go to https://www.postman.com/downloads/
2. Download and install for your OS
3. Open Postman

### Create a Test Request:

**Test Getting All Categories:**
1. Click "+" to create new request
2. Set method to **GET**
3. In the URL field, paste: `http://localhost:3000/api/categories`
4. Click "Send"
5. You should see: `{"success":true,"data":[]}`

**Test Creating a Category:**
1. Create new request
2. Set method to **POST**
3. URL: `http://localhost:3000/api/categories`
4. Go to "Body" tab
5. Select "form-data"
6. Add these fields:
   - Key: `name` | Value: `Electronics`
   - Key: `description` | Value: `All electronic items`
   - Key: `image` | Value: (click file and select any image from your computer)
7. Click "Send"
8. You should get back the created category with an ID

**Success!** You just created data in your database! 🎉

---

## Step 7: Access Your Database (View Your Data)

### If using MongoDB Atlas:
1. Go to https://cloud.mongodb.com
2. Log in
3. Click on your deployment
4. Click "Collections"
5. You should see your `resolute-fashions` database with collections like `categories`, `products`, etc.
6. Click on a collection to see your data

### If using Local MongoDB:
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Install it
3. Open Compass
4. It should auto-connect to `localhost:27017`
5. Click on `resolute-fashions` database
6. See your collections and data

---

## Common Issues & Solutions

### Problem: "MONGODB_URI is not defined"
**Solution:** 
- Make sure `.env.local` file exists in the root folder
- Restart the dev server (Ctrl+C to stop, then `npm run dev` to restart)

### Problem: "MongoDB connection timeout"
**Solution:**
- Check your `.env.local` has correct connection string
- If using Atlas: Make sure you're connected to internet
- If using Local: Make sure MongoDB is running

### Problem: "Port 3000 is already in use"
**Solution:**
- Close any other app using port 3000
- Or run: `npm run dev -- -p 3001` to use port 3001 instead

### Problem: Image upload doesn't work
**Solution:**
- Make sure the `public/uploads` folder exists
- If missing, create it manually in the `public` folder

### Problem: "Cannot find module 'mongoose'"
**Solution:**
```bash
npm install
```
Then restart the server

---

## Next Steps After Setup Works

Once everything is running:

1. **Create Admin Dashboard** - Build a UI to manage categories, products, banners, offers
2. **Add More Products** - Populate your database with real products
3. **Connect Frontend** - Use the API client functions in `lib/api-client.ts` to fetch data in your components
4. **Deploy** - Push to production (Vercel for Next.js makes it easy)

---

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Stop development server
Ctrl+C (in terminal)
```

---

## API Endpoints Quick Reference

All endpoints return: `{ success: true/false, data: ... }`

```
Categories:
  GET    /api/categories           - Get all
  POST   /api/categories           - Create (with image)
  GET    /api/categories/:id       - Get one
  PUT    /api/categories/:id       - Update (with image)
  DELETE /api/categories/:id       - Delete

Products:
  GET    /api/products             - Get all
  POST   /api/products             - Create (with image)
  GET    /api/products/:id         - Get one
  PUT    /api/products/:id         - Update (with image)
  DELETE /api/products/:id         - Delete

Banners:
  GET    /api/banners              - Get all
  POST   /api/banners              - Create (with image)
  GET    /api/banners/:id          - Get one
  PUT    /api/banners/:id          - Update (with image)
  DELETE /api/banners/:id          - Delete

Offers:
  GET    /api/offers               - Get all
  POST   /api/offers               - Create (with image)
  GET    /api/offers/:id           - Get one
  PUT    /api/offers/:id           - Update (with image)
  DELETE /api/offers/:id           - Delete
```

---

## Need More Help?

- **Database Questions:** Check MongoDB docs at https://docs.mongodb.com/
- **Next.js Questions:** Check Next.js docs at https://nextjs.org/docs
- **React Questions:** Check React docs at https://react.dev/

**You're doing great! Start with Step 1 and follow each step carefully.** 💪
