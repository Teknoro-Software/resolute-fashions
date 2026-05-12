# Quick Start - 5 Minute Setup

**Choose your path:**

---

## Path A: Cloud Database (Easiest) ☁️

### 1. Create MongoDB Atlas Account (2 min)
```
Go to: https://www.mongodb.com/cloud/atlas
↓
Sign up → Create Free Project → Create Free Cluster
↓
Create User: username=admin, password=password123
↓
Get Connection String (copy it)
```

### 2. Update `.env.local` (30 sec)
```
MONGODB_URI=mongodb+srv://admin:password123@cluster0.xxxxx.mongodb.net/resolute-fashions?retryWrites=true&w=majority
NODE_ENV=development
```

### 3. Start Server (1 min)
```bash
npm run dev
```

### 4. Test (1 min)
```bash
curl http://localhost:3000/api/categories
# Should see: {"success":true,"data":[]}
```

**Done!** ✅

---

## Path B: Local Database 🖥️

### 1. Install MongoDB (depends on OS)

**Windows:**
- Download: https://www.mongodb.com/try/download/community
- Run installer, click Next through all screens
- It starts automatically

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### 2. Update `.env.local` (30 sec)
```
MONGODB_URI=mongodb://localhost:27017/resolute-fashions
NODE_ENV=development
```

### 3. Start Server (1 min)
```bash
npm run dev
```

### 4. Test (1 min)
```bash
curl http://localhost:3000/api/categories
# Should see: {"success":true,"data":[]}
```

**Done!** ✅

---

## Visual Checklist

- [ ] Node.js installed? (`node --version` shows version)
- [ ] Database chosen? (Atlas or Local)
- [ ] `.env.local` updated with connection string?
- [ ] `npm install` has been run?
- [ ] `npm run dev` is running?
- [ ] Can access http://localhost:3000?
- [ ] Can access http://localhost:3000/api/categories and get `{"success":true,"data":[]}`?

**If all checked ✅, you're ready to build!**

---

## Video-Style Steps

### Terminal (PowerShell/Terminal)

```
PS E:\resolute-fashions> npm run dev
```

**Expected Output:**
```
  ▲ Next.js 16.2.3
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

If you see this → **Success!** ✅

### Test the API

**Open NEW terminal tab (Ctrl+`)**

```
PS E:\resolute-fashions> curl http://localhost:3000/api/categories
```

**Expected Output:**
```
{"success":true,"data":[]}
```

If you see this → **Everything works!** ✅

---

## If Something Goes Wrong

| Problem | Solution |
|---------|----------|
| `MONGODB_URI is not defined` | Restart server: Ctrl+C, then `npm run dev` |
| `Cannot connect to MongoDB` | Check `.env.local` has correct connection string |
| `Port 3000 already in use` | Run: `npm run dev -- -p 3001` |
| `No such file: .env.local` | Create it in root folder with config from above |
| `Module not found` | Run: `npm install` |

---

## Next: Create Your First Data

### Using Postman (Recommended)

1. Download: https://www.postman.com/downloads/
2. Create NEW POST request
3. URL: `http://localhost:3000/api/categories`
4. Body → form-data:
   - `name`: Electronics
   - `description`: All electronic items
   - `image`: (select any .jpg or .png file)
5. Click SEND

**You should get back:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Electronics",
    "description": "All electronic items",
    "image": "/uploads/123456-image.jpg",
    "slug": "electronics",
    ...
  }
}
```

**Congrats! You created your first database entry!** 🎉

---

## What's Running?

- **Frontend:** http://localhost:3000 (your shopping website)
- **API:** http://localhost:3000/api (your backend endpoints)
- **Database:** MongoDB (stores all your data)
- **All bundled together** in one Next.js application

---

## Recommended Next Steps

1. ✅ Setup complete → Test with Postman
2. Create categories (Electronics, Fashion, Home, etc.)
3. Create products under each category
4. Create banners for homepage
5. Create offers/discounts
6. Build admin dashboard to manage everything
7. Connect frontend to display data

---

## Files You Modified

```
✓ .env.local              ← Your database connection
✓ public/uploads/         ← Image storage (auto-created on first upload)
✓ /api/handlers/          ← Your backend logic
✓ /app/api/               ← Your API routes
✓ /lib/models/            ← Your database schemas
```

---

## Start Here

**In order:**
1. Pick database (Atlas = easier)
2. Update `.env.local`
3. Run `npm run dev`
4. Test with curl/Postman
5. If working → start creating data!

**Questions?** Read the full `BEGINNER_GUIDE.md`
