# Resolute Fashions - E-Commerce Platform

A modern, full-stack e-commerce application built with Next.js, React, MongoDB, and Tailwind CSS.

## 🚀 Quick Start (Choose One)

### ⭐ I'm a Beginner - Start Here!
👉 **Read:** [`QUICK_START.md`](QUICK_START.md) (5 minutes)

### 📚 I Want Full Instructions
👉 **Read:** [`BEGINNER_GUIDE.md`](BEGINNER_GUIDE.md) (detailed step-by-step)

### 🆘 Something Broke
👉 **Read:** [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) (find your error and fix it)

### 📖 I Want to Understand Everything
👉 **Read:** [`DOCUMENTATION.md`](DOCUMENTATION.md) (navigation guide for all docs)

---

## 📋 What You Get

✅ Full-stack e-commerce website  
✅ Product catalog with categories  
✅ Shopping cart functionality  
✅ Admin API for managing:
   - Categories
   - Products
   - Promotional banners
   - Discount offers  
✅ Image upload system  
✅ MongoDB database integration  
✅ Fully responsive design  

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** MongoDB
- **Animations:** Framer Motion
- **Icons:** React Icons, Lucide React

---

## 📁 Project Structure

```
resolute-fashions/
├── app/                 ← Website pages & API routes
├── components/          ← UI components
├── api/handlers/        ← Backend business logic
├── lib/                 ← Database models & utilities
├── context/             ← Shared state (cart)
├── public/uploads/      ← Uploaded images
└── [documentation files]
```

👉 **Learn more:** [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md)

---

## ⚡ 30 Second Setup

1. **Set up database** (MongoDB Atlas or Local)
2. **Update** `.env.local` with connection string
3. **Run** `npm run dev`
4. **Test** at http://localhost:3000
5. **Create data** with Postman
6. **Done!** ✅

For detailed steps, read [`QUICK_START.md`](QUICK_START.md)

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [QUICK_START.md](QUICK_START.md) | 5-minute quick setup |
| [BEGINNER_GUIDE.md](BEGINNER_GUIDE.md) | Detailed beginner instructions |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | Code structure explanation |
| [BACKEND_API.md](BACKEND_API.md) | API endpoint reference |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common errors & fixes |
| [DOCUMENTATION.md](DOCUMENTATION.md) | Guide navigation |
| [api/README.md](api/README.md) | API handlers explanation |

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Database Setup

You need MongoDB. Choose one:

### Option 1: MongoDB Atlas (Cloud) - Recommended
- Go to https://www.mongodb.com/cloud/atlas
- Create free account
- Get connection string
- Update `.env.local`

### Option 2: Local MongoDB
- Download from https://www.mongodb.com/try/download/community
- Install and run
- Connection string: `mongodb://localhost:27017/resolute-fashions`

👉 **Full instructions:** [`QUICK_START.md`](QUICK_START.md) or [`BEGINNER_GUIDE.md`](BEGINNER_GUIDE.md)

---

## 📝 Environment Variables

Create `.env.local` in the root folder:

```env
MONGODB_URI=your_connection_string_here
NODE_ENV=development
```

👉 **How to get connection string:** See [`BEGINNER_GUIDE.md`](BEGINNER_GUIDE.md) Step 1

---

## 🧪 Testing the API

Use Postman to test endpoints:

1. Download: https://www.postman.com/downloads/
2. Create POST request to: `http://localhost:3000/api/categories`
3. Add form data: `name`, `description`, `image` (file)
4. Click Send
5. See your data created! ✅

👉 **Detailed guide:** [`BEGINNER_GUIDE.md`](BEGINNER_GUIDE.md) Step 6

---

## 🎯 Next Steps

1. ✅ Set up database and run server
2. ✅ Create test data (categories, products)
3. ✅ Build admin dashboard
4. ✅ Connect frontend to API
5. ✅ Deploy to production

---

## 🆘 Need Help?

1. **First time?** → Read [`QUICK_START.md`](QUICK_START.md)
2. **Something broke?** → See [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md)
3. **Want to learn?** → Read [`BEGINNER_GUIDE.md`](BEGINNER_GUIDE.md)
4. **Lost?** → Check [`DOCUMENTATION.md`](DOCUMENTATION.md)
5. **Still stuck?** → See [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) → "My Own Custom Error"

---

## 📞 Support Resources

- **Next.js Docs:** https://nextjs.org/docs
- **MongoDB Docs:** https://docs.mongodb.com/
- **React Docs:** https://react.dev/
- **Tailwind Docs:** https://tailwindcss.com/docs
- **Stack Overflow:** https://stackoverflow.com/

---

## 🎓 Learning Path

For complete beginners, follow this order:

1. Read [`QUICK_START.md`](QUICK_START.md) (5 min)
2. Follow [`BEGINNER_GUIDE.md`](BEGINNER_GUIDE.md) (30 min)
3. Read [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) (20 min)
4. Explore code in VS Code (hands-on learning)
5. Read [`BACKEND_API.md`](BACKEND_API.md) (reference)
6. Start building! 🚀

---

## 📄 License

This project is open source.

---

**Start with [`QUICK_START.md`](QUICK_START.md)** → Get set up in 5 minutes! ⚡

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
