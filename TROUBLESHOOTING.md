# Troubleshooting Guide - Common Errors

When things go wrong, find your error below and follow the solution.

---

## 🔴 Error: "MONGODB_URI is not defined"

**What it means:** The server can't find your database connection string

**Why it happens:** 
- `.env.local` file is missing
- `.env.local` doesn't have `MONGODB_URI`
- Typo in the variable name

**How to fix:**

1. **Check file exists:**
   - Look in your project root folder
   - You should see a file named `.env.local`
   - If it doesn't exist, create it

2. **Check content:**
   - Open `.env.local`
   - It should have:
     ```
     MONGODB_URI=mongodb+srv://admin:password123@cluster0.xxxxx.mongodb.net/resolute-fashions?retryWrites=true&w=majority
     NODE_ENV=development
     ```

3. **Restart server:**
   - Press `Ctrl+C` in terminal
   - Run `npm run dev` again

---

## 🔴 Error: "Cannot connect to MongoDB"

**What it means:** Server found the connection string but can't reach the database

**Why it happens:**
- MongoDB isn't running (local installation)
- Internet disconnected (MongoDB Atlas)
- Wrong connection string
- Database credentials are wrong

**How to fix:**

**If using MongoDB Atlas (Cloud):**
1. Check internet connection
2. Go to https://cloud.mongodb.com
3. Log in and verify cluster is running (green status)
4. Click "Connect" → "Drivers"
5. Copy the connection string again
6. Update `.env.local`
7. Restart server

**If using Local MongoDB:**

**Windows:**
- Open "Services" (press Win+R, type `services.msc`)
- Look for "MongoDB Server"
- If it's not running, right-click and select "Start"
- Restart your server

**Mac:**
```bash
brew services start mongodb-community
# Then restart your server
npm run dev
```

**Linux:**
```bash
sudo systemctl start mongodb
# Then restart your server
npm run dev
```

---

## 🔴 Error: "Cannot find module 'mongoose'"

**What it means:** Required npm packages aren't installed

**Why it happens:**
- First time running project
- Someone deleted `node_modules` folder
- Installation was interrupted

**How to fix:**

```bash
# Run this in terminal
npm install

# Then start server
npm run dev
```

This will download all required packages (~400MB, takes a few minutes)

---

## 🔴 Error: "Port 3000 is already in use"

**What it means:** Another application is using port 3000

**Why it happens:**
- You already have Next.js running
- Another app is using port 3000
- Server didn't shut down properly

**How to fix:**

**Option 1: Use different port**
```bash
npm run dev -- -p 3001
# Now access http://localhost:3001
```

**Option 2: Stop the other app**
- Look for terminal with "Next.js" running
- Press `Ctrl+C`
- Wait 5 seconds
- Run `npm run dev` again

**Option 3: Windows - Force kill process**
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill it (replace PID with number from above)
taskkill /PID PID /F

# Then run
npm run dev
```

---

## 🔴 Error: "File not found: public/uploads"

**What it means:** Image upload folder doesn't exist

**Why it happens:**
- Folder wasn't created
- Accidentally deleted
- Permission issues

**How to fix:**

1. Open your project folder in Windows Explorer
2. Navigate to: `public/`
3. Right-click → New → Folder
4. Name it: `uploads`
5. Restart server: `npm run dev`

Or in terminal:
```bash
mkdir public/uploads
npm run dev
```

---

## 🔴 Error: "ValidationError: name: Path 'name' is required"

**What it means:** You're trying to create data without required fields

**Why it happens:**
- Missing required field in your POST request
- Typo in field name

**How to fix:**

When creating a category in Postman:
- ✅ Include: `name`, `description`, `image`
- ❌ Don't forget any fields

When creating a product:
- ✅ Include: `name`, `description`, `price`, `originalPrice`, `category`, `image`
- ❌ Don't forget any fields

---

## 🔴 Error: "Cast to ObjectId failed for value"

**What it means:** You're using an invalid ID

**Why it happens:**
- ID format is wrong
- ID doesn't exist in database
- Typo in the URL

**How to fix:**

- Make sure ID is 24 characters long (from MongoDB)
- Copy ID directly from database, don't type it
- In Postman, use correct URL: `/api/categories/65f1a2b3c4d5e6f7g8h9i0j1`

---

## 🔴 Error: "Image upload failed"

**What it means:** Server can't save your image file

**Why it happens:**
- File is too large (max 5MB)
- File isn't an image
- Wrong file type
- `public/uploads/` folder missing

**How to fix:**

1. **Check file size:** Image must be under 5MB
2. **Check file type:** Only JPEG, PNG, WebP, GIF supported
3. **Verify folder exists:** `public/uploads/` folder should exist
4. **Try different image:** Test with a small known-good image

---

## 🔴 Error: "EACCES: permission denied"

**What it means:** System won't let the app access a file/folder

**Why it happens:**
- File permissions are restricted
- Running without admin access
- Folder is locked

**How to fix:**

**Windows:** 
- Right-click Terminal
- Select "Run as Administrator"
- Run `npm run dev`

**Mac/Linux:**
```bash
# Give folder permission
sudo chmod -R 755 public/uploads

# Then start server
npm run dev
```

---

## 🔴 Error: "ENOTFOUND cluster0.xxxxx.mongodb.net"

**What it means:** Can't reach MongoDB Atlas servers

**Why it happens:**
- Internet disconnected
- Firewall is blocking
- Connection string is wrong
- Typo in domain name

**How to fix:**

1. Check internet connection
2. Check firewall - make sure MongoDB Atlas isn't blocked
3. Get fresh connection string:
   - Go to https://cloud.mongodb.com
   - Click "Connect"
   - Click "Drivers"
   - Copy the full string again
4. Paste into `.env.local`

---

## 🔴 Error: "Cannot GET /api/categories"

**What it means:** Route doesn't exist or isn't working

**Why it happens:**
- Server crashed
- File has syntax error
- Server didn't restart after changes

**How to fix:**

1. Check terminal - are there any red error messages?
2. Press `Ctrl+C` to stop server
3. Look at error message
4. Check file: `app/api/categories/route.ts` exists?
5. Check file has no typos
6. Run `npm run dev` again

---

## 🔴 Terminal shows "✓ Ready in X.Xs" but nothing works

**What it means:** Server is running but something's misconfigured

**Why it happens:**
- Database not connected
- Routes not properly configured

**How to fix:**

1. Open a new terminal
2. Test: `curl http://localhost:3000/api/categories`
3. If you get response → good!
4. If you get error → check `.env.local` and MongoDB connection

---

## 🟡 Warning: "Module not found: tsconfig.json"

**What it means:** TypeScript configuration is missing or broken

**Why it happens:**
- File got deleted
- Project not properly initialized

**How to fix:**

```bash
# This should already exist, but if not:
npm install

# Restart
npm run dev
```

---

## My Own Custom Error

**Follow these steps:**

1. **Read the error message** - Usually first line tells you what's wrong
2. **Google it** - Copy the error message and Google it
3. **Check the docs:**
   - Next.js: https://nextjs.org/docs
   - MongoDB: https://docs.mongodb.com/
   - React: https://react.dev/
4. **Ask for help:**
   - Stack Overflow: https://stackoverflow.com/
   - GitHub Issues
   - Dev communities

---

## If None of This Works

**Try the nuclear option:**

```bash
# Stop server (Ctrl+C)

# Delete node_modules and reinstall
rm -r node_modules
npm install

# Clear cache
npm cache clean --force

# Start fresh
npm run dev
```

---

## Debugging Tips

### Check if server is running:
```bash
curl http://localhost:3000
# Should see HTML code (your website)
```

### Check if API works:
```bash
curl http://localhost:3000/api/categories
# Should see: {"success":true,"data":[]}
```

### Check if database connected:
Look in terminal when server starts. You should NOT see MongoDB errors.

### Enable verbose logging:
```bash
# Mac/Linux
DEBUG=* npm run dev

# Windows PowerShell
$env:DEBUG="*"; npm run dev
```

---

## Quick Reference

| Error | Quick Fix |
|-------|-----------|
| MONGODB_URI not defined | Restart: Ctrl+C, npm run dev |
| Cannot connect to MongoDB | Start MongoDB or verify connection string |
| Cannot find module | Run: npm install |
| Port already in use | Kill process or use different port |
| File not found: uploads | Create public/uploads folder |
| Image upload failed | Check file size (<5MB) and type |
| Cannot GET /api/categories | Check route file exists, no typos |

---

## Still Stuck?

1. Check `BEGINNER_GUIDE.md` for full setup instructions
2. Check `QUICK_START.md` for fastest path
3. Read the specific error section above
4. Google the error message
5. Ask for help with:
   - Full error message (copy-paste)
   - What you were trying to do
   - Your `.env.local` content (hide passwords)
   - Your terminal output
