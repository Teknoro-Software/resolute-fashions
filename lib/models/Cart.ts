import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem extends Document {
  cartItemId: string;
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  size: string;
  quantity: number;
  addedAt: Date;
}

export interface ICart extends Document {
  userId?: string; // Optional for guest carts, can use session ID
  sessionId: string; // For guest users
  items: ICartItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>(
  {
    cartItemId: {
      type: String,
      required: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    productId: {
      type: String,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: String,
      required: false, // Optional for authenticated users
    },
    sessionId: {
      type: String,
      required: true, // For guest carts
      unique: true,
    },
    items: [CartItemSchema],
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient lookups
CartSchema.index({ sessionId: 1 });
CartSchema.index({ userId: 1 });

export default mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
