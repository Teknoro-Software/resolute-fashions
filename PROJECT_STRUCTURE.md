# Project Structure Explained

This guide explains what each folder does in simple terms.

---

## The Big Picture

```
Your Website:
├── Frontend (What users see) ← app/, components/
├── Backend (What powers it)  ← api/
├── Database (Where data lives) ← MongoDB
└── Utilities (Helper code)   ← lib/
```

---

## Folder-by-Folder Breakdown

### 📁 `app/` - Your Website Pages & Routes

```
app/
├── layout.tsx           ← Main page template (header, footer wrapper)
├── page.tsx             ← Homepage
├── globals.css          ← Website styling
├── cart/
│   └── page.tsx         ← Shopping cart page
├── products/
│   ├── page.tsx         ← All products page
│   └── [id]/
│       └── page.tsx     ← Single product page (e.g., /products/123)
├── contact/
│   └── page.tsx         ← Contact page
└── api/                 ← Your backend endpoints
    ├── categories/
    ├── products/
    ├── banners/
    └── offers/
```

**What it does:** Shows pages to visitors  
**When to edit:** When you want to change what users see

---

### 📁 `components/` - Reusable Building Blocks

```
components/
├── Navbar.tsx           ← Navigation bar
├── Footer.tsx           ← Footer
├── Loader.tsx           ← Loading spinner
└── home/
    ├── Hero.tsx         ← Big banner at top
    ├── Categories.tsx   ← Category cards
    ├── Products.tsx     ← Product list
    ├── NewArrivals.tsx  ← New items section
    ├── Poster.tsx       ← Promotional poster
    └── ContactSection.tsx ← Contact form
```

**What it does:** Reusable pieces you use on multiple pages  
**When to edit:** When you want to change how something looks

---

### 📁 `api/` - Backend Business Logic ⭐

```
api/
└── handlers/            ← Where the "thinking" happens
    ├── categories/
    │   └── handlers.ts  ← Create/Read/Update/Delete categories
    ├── products/
    │   └── handlers.ts  ← Create/Read/Update/Delete products
    ├── banners/
    │   └── handlers.ts  ← Create/Read/Update/Delete banners
    └── offers/
        └── handlers.ts  ← Create/Read/Update/Delete offers
```

**What it does:** 
- Receives requests from frontend
- Talks to database
- Returns data

**When to edit:** When you want to add new features or business logic

**Example flow:**
```
Frontend: "Get all products"
    ↓
Route: app/api/products/route.ts
    ↓
Handler: api/handlers/products/handlers.ts (queries database)
    ↓
Returns: [{ product1 }, { product2 }, ...]
```

---

### 📁 `lib/` - Utilities & Helpers

```
lib/
├── db.ts                ← Connect to MongoDB
├── api-client.ts        ← Helper functions for frontend to call API
├── upload.ts            ← Handle image uploads
└── models/
    ├── Category.ts      ← What a "Category" looks like
    ├── Product.ts       ← What a "Product" looks like
    ├── Banner.ts        ← What a "Banner" looks like
    └── Offer.ts         ← What an "Offer" looks like
```

**What it does:** Shared code everyone uses  
**When to edit:** When you need to add new utilities

---

### 📁 `public/` - Static Files

```
public/
└── uploads/             ← Where images are saved
```

**What it does:** Store files that don't change  
**When to edit:** Never directly (files get saved here automatically)

---

### 📁 `context/` - Shared State

```
context/
└── CartContext.tsx      ← Shopping cart data (shared across pages)
```

**What it does:** Stores data that multiple components need  
**When to edit:** When you need to share data between pages

---

## Data Flow Example

**User adds product to cart:**

```
1. User clicks "Add to Cart" button
   ↓
2. Component (Products.tsx) calls API
   ↓
3. Frontend sends request to backend
   ↓
4. Route receives it (app/api/products/route.ts)
   ↓
5. Handler processes it (api/handlers/products/handlers.ts)
   ↓
6. Handler talks to database (lib/models/Product.ts)
   ↓
7. Database returns product data
   ↓
8. Response sent back to frontend
   ↓
9. Frontend updates CartContext
   ↓
10. Components read CartContext and update UI
   ↓
11. User sees "Added to cart" ✓
```

---

## Configuration Files

```
Root folder:
├── package.json         ← List of all code libraries (npm packages)
├── tsconfig.json        ← TypeScript settings
├── next.config.ts       ← Next.js settings
├── .env.local           ← Your secrets (database connection, API keys)
├── .gitignore           ← What to exclude from git
└── README.md            ← Project description
```

---

## File Type Explanations

### `.tsx` files (TypeScript React)
- Website pages and components
- Can show UI and handle user clicks
- Used in `app/` and `components/`

### `.ts` files (TypeScript)
- Backend logic and utilities
- Can't show UI directly
- Used in `lib/`, `api/`, `context/`

### `.json` files
- Settings and configuration
- `package.json` = list of dependencies
- `.env.local` = secret settings

### `.css` files
- Styling/colors/layout
- Used to make things look pretty

### `.md` files
- Documentation (like this!)
- `README.md` = project overview

---

## Request Routing Example

**When you access: `http://localhost:3000/api/categories`**

```
Next.js looks for: app/api/categories/route.ts
Found it!
Runs the GET function from that file
That function imports: handleGetCategories from api/handlers/categories/handlers.ts
handleGetCategories:
  1. Connects to database
  2. Queries all categories
  3. Returns them as JSON
Frontend gets the data!
```

---

## Where to Find Things

**"I want to..."**

| Goal | Location |
|------|----------|
| Change homepage | `app/page.tsx` |
| Add new page | Create folder in `app/` |
| Change navbar | `components/Navbar.tsx` |
| Add new component | Create `.tsx` in `components/` |
| Fix database connection | `lib/db.ts` |
| Add new API endpoint | Create in `app/api/` + `api/handlers/` |
| Change product schema | `lib/models/Product.ts` |
| Handle image uploads | `lib/upload.ts` |
| Call API from frontend | Use functions from `lib/api-client.ts` |
| Store shopping cart | `context/CartContext.tsx` |

---

## Simple Analogy

Think of the project like a restaurant:

```
🏪 Restaurant = Your E-commerce Site

📋 Menu (frontend/components)
   ↓ Customer orders
🛎️ Waiter (API routes)
   ↓ Takes order to kitchen
👨‍🍳 Chef (handlers)
   ↓ Looks up recipe
📚 Recipe book (models)
   ↓ Gets ingredients
🛒 Pantry (database)
   ↓ Chef prepares dish
   ↓ Waiter brings plate
👥 Customer sees meal ✓
```

---

## Key Concepts

**Request:** Frontend asking backend for something
```
"Give me all products"
```

**Response:** Backend answering
```
{ success: true, data: [products] }
```

**Handler:** Function that processes a request
```
Get request → handleGetProducts → query database → send response
```

**Model:** Definition of data structure
```
A Product has: name, price, description, image, category, stock
```

**Database:** Permanent storage
```
All your products, categories, users, orders
```

---

## Next Steps

1. ✅ Understand the structure (you just did!)
2. 🚀 Run `npm run dev`
3. 📝 Create test data via Postman
4. 🔍 Look at the code files to see how it works
5. 💻 Modify things and see what happens
6. 🧠 Ask questions when stuck

**Don't be afraid to explore and experiment!** 🎯
