# API Backend Structure

This folder contains all backend API logic separated from Next.js route definitions for better organization and reusability.

## Structure

```
api/
├── handlers/              # API business logic
│   ├── categories/
│   │   └── handlers.ts   # Category CRUD handlers
│   ├── products/
│   │   └── handlers.ts   # Product CRUD handlers
│   ├── banners/
│   │   └── handlers.ts   # Banner CRUD handlers
│   └── offers/
│       └── handlers.ts   # Offer CRUD handlers
└── README.md             # This file
```

## How It Works

### Separation of Concerns
- **`api/handlers/`** - Contains all business logic, database operations, and error handling
- **`app/api/`** - Contains only route definitions that delegate to handlers

### Example Flow

#### Request comes to Next.js route:
```
GET /api/categories
  ↓
app/api/categories/route.ts
  ↓
Imports: handleGetCategories from api/handlers/categories/handlers.ts
  ↓
Returns response
```

## Adding New Endpoints

1. **Create handler file** in `api/handlers/<resource>/handlers.ts`
2. **Define handler functions** (e.g., `handleGet<Resource>`, `handleCreate<Resource>`)
3. **Create route file** in `app/api/<resource>/route.ts`
4. **Import and call** the handler functions

### Example: Adding a new `Comments` resource

```typescript
// api/handlers/comments/handlers.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Comment from "@/lib/models/Comment";

export async function handleGetComments() {
  try {
    await connectDB();
    const comments = await Comment.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

// ... more handlers
```

```typescript
// app/api/comments/route.ts
import { NextRequest } from "next/server";
import { handleGetComments } from "@/api/handlers/comments/handlers";

export async function GET(request: NextRequest) {
  return handleGetComments();
}
```

## Benefits

✅ **Clean Architecture** - Separation between routes and business logic  
✅ **Reusability** - Handlers can be imported and reused elsewhere  
✅ **Testability** - Logic is isolated and easier to unit test  
✅ **Maintainability** - Changes to logic don't affect route definitions  
✅ **Scalability** - Easy to add new endpoints without cluttering `app/api/`

## Folder Organization

- Keep handlers organized by resource type (categories, products, etc.)
- One handler file per resource (all CRUD operations together)
- Keep database models in `lib/models/`
- Keep shared utilities in `lib/`

## Available Handlers

### Categories (`api/handlers/categories/handlers.ts`)
- `handleGetCategories()` - Get all categories
- `handleCreateCategory(request)` - Create new category
- `handleGetCategory(id)` - Get single category
- `handleUpdateCategory(id, request)` - Update category
- `handleDeleteCategory(id)` - Delete category

### Products (`api/handlers/products/handlers.ts`)
- `handleGetProducts(category?)` - Get all products (optionally filtered by category)
- `handleCreateProduct(request)` - Create new product
- `handleGetProduct(id)` - Get single product
- `handleUpdateProduct(id, request)` - Update product
- `handleDeleteProduct(id)` - Delete product

### Banners (`api/handlers/banners/handlers.ts`)
- `handleGetBanners()` - Get all banners
- `handleCreateBanner(request)` - Create new banner
- `handleGetBanner(id)` - Get single banner
- `handleUpdateBanner(id, request)` - Update banner
- `handleDeleteBanner(id)` - Delete banner

### Offers (`api/handlers/offers/handlers.ts`)
- `handleGetOffers()` - Get all offers
- `handleCreateOffer(request)` - Create new offer
- `handleGetOffer(id)` - Get single offer
- `handleUpdateOffer(id, request)` - Update offer
- `handleDeleteOffer(id)` - Delete offer

## Error Handling

All handlers follow a consistent error handling pattern:

```typescript
try {
  await connectDB();
  // ... business logic
  return NextResponse.json({ success: true, data: result }, { status: 200 });
} catch (error) {
  return NextResponse.json(
    { success: false, error: (error as Error).message },
    { status: 500 }
  );
}
```

## Related Documentation

- See `BACKEND_API.md` for complete API endpoint documentation
- See `BACKEND_SETUP.md` for setup instructions
- See `lib/models/` for database schema definitions
