# Backend API Documentation

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### Environment Variables
Create a `.env.local` file in the project root:
```
MONGODB_URI=mongodb://localhost:27017/resolute-fashions
NODE_ENV=development
```

### Start Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

---

## API Endpoints

### Categories

#### Get All Categories
```
GET /api/categories
```
Response: `{ success: true, data: [...] }`

#### Get Single Category
```
GET /api/categories/:id
```

#### Create Category
```
POST /api/categories
Content-Type: multipart/form-data

Form Fields:
- name (string, required)
- description (string, required)
- image (File, required)
```

#### Update Category
```
PUT /api/categories/:id
Content-Type: multipart/form-data

Form Fields:
- name (string, optional)
- description (string, optional)
- image (File, optional)
```

#### Delete Category
```
DELETE /api/categories/:id
```

---

### Products

#### Get All Products
```
GET /api/products
GET /api/products?category=categoryId  (filter by category)
```

#### Get Single Product
```
GET /api/products/:id
```

#### Create Product
```
POST /api/products
Content-Type: multipart/form-data

Form Fields:
- name (string, required)
- description (string, required)
- price (number, required)
- originalPrice (number, required)
- category (string, required - Category ID)
- sizes (string, required - comma-separated or JSON array, e.g., "30ml,50ml,100ml" or ["30ml","50ml","100ml"])
- stock (number, optional)
- image (File, required)
```

#### Update Product
```
PUT /api/products/:id
Content-Type: multipart/form-data

Form Fields:
- name (string, optional)
- description (string, optional)
- price (number, optional)
- originalPrice (number, optional)
- category (string, optional)
- sizes (string, optional - comma-separated or JSON array)
- stock (number, optional)
- image (File, optional)
```

#### Delete Product
```
DELETE /api/products/:id
```

---

### Banners

#### Get All Banners
```
GET /api/banners
```

#### Get Single Banner
```
GET /api/banners/:id
```

#### Create Banner
```
POST /api/banners
Content-Type: multipart/form-data

Form Fields:
- title (string, required)
- subtitle (string, optional)
- link (string, optional, default: "/")
- order (number, optional, default: 0)
- products (string, optional - comma-separated or JSON array)
- image (File, optional)
```

#### Update Banner
```
PUT /api/banners/:id
Content-Type: multipart/form-data

Form Fields:
- title (string, optional)
- subtitle (string, optional)
- link (string, optional)
- order (number, optional)
- isActive (boolean, optional)
- products (string, optional - comma-separated or JSON array)
- image (File, optional)
```

#### Delete Banner
```
DELETE /api/banners/:id
```

---

### Offers

#### Get All Offers
```
GET /api/offers
```

#### Get Single Offer
```
GET /api/offers/:id
```

#### Create Offer
```
POST /api/offers
Content-Type: multipart/form-data

Form Fields:
- title (string, required)
- description (string, optional)
- code (string, required, unique)
- discountPercentage (number, required, 0-100)
- startDate (ISO string, required)
- endDate (ISO string, required)
- applicableTo (string, optional: "all" | "category" | "product", default: "all")
- applicableCategory (string, optional - Category ID, required if applicableTo="category")
- applicableProduct (string, optional - Product ID, required if applicableTo="product")
- image (File, required)
```

#### Update Offer
```
PUT /api/offers/:id
Content-Type: multipart/form-data

Form Fields: (all optional)
- title (string)
- description (string)
- code (string)
- discountPercentage (number)
- startDate (ISO string)
- endDate (ISO string)
- applicableTo (string)
- applicableCategory (string)
- applicableProduct (string)
- isActive (boolean)
- image (File)
```

---

### Cart

#### Get Cart
```
GET /api/cart
```
Response: `{ success: true, data: { sessionId, items: [...], total } }`

#### Add Item to Cart
```
POST /api/cart
Content-Type: application/json

Body:
{
  "productId": "string (required)",
  "size": "string (required)",
  "quantity": 1
}
```

#### Update Cart Item Quantity
```
PUT /api/cart/:itemId
Content-Type: application/json

Body:
{
  "quantity": 2
}
```

#### Remove Item from Cart
```
DELETE /api/cart/:itemId
```

#### Clear Cart
```
DELETE /api/cart
```

---

## Frontend Integration

Use the provided API client functions in `lib/api-client.ts`:

```typescript
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from "@/lib/api-client";

// Example: Fetch all categories
const { data } = await getCategories();

// Example: Create a new category
const formData = new FormData();
const imageFile = /* File object */;
const { data: newCategory } = await createCategory("Electronics", "All electronic items", imageFile);
```

---

## Database Models

### Category
```
{
  _id: ObjectId,
  name: String (unique),
  description: String,
  image: String (URL),
  slug: String (unique, auto-generated),
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String (Category ID),
  image: String (URL),
  images: [String] (URLs),
  stock: Number,
  rating: Number (0-5),
  reviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Banner
```
{
  _id: ObjectId,
  title: String,
  subtitle: String,
  image: String (URL),
  link: String,
  isActive: Boolean,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Offer
```
{
  _id: ObjectId,
  title: String,
  description: String,
  image: String (URL),
  discountPercentage: Number (0-100),
  code: String (unique),
  startDate: Date,
  endDate: Date,
  isActive: Boolean,
  applicableTo: String ("all" | "category" | "product"),
  applicableCategory: String (Category ID, optional),
  applicableProduct: String (Product ID, optional),
  createdAt: Date,
  updatedAt: Date
}
```

---

## File Upload

- Images are stored in `public/uploads/` directory
- Supported formats: JPEG, PNG, WebP, GIF
- Max file size: 5MB
- Files are accessible via URLs like: `/uploads/filename.jpg`

---

## Error Handling

All endpoints return standardized responses:

**Success:**
```json
{
  "success": true,
  "data": { /* resource data */ }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

HTTP Status Codes:
- `200 OK` - GET request successful
- `201 Created` - POST request successful
- `200 OK` - PUT/DELETE request successful
- `400 Bad Request` - Missing or invalid fields
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error
