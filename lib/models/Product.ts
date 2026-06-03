import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: mongoose.Types.ObjectId;
  subCategory: string;
  images: string[];
  sizes: string[];
  stock: number;
  newArrival: boolean;
  featured: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategory: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    sizes: {
      type: [String],
      default: [],
    },

    stock: {
      type: Number,
      default: 0,
    },
    newArrival: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// IMPORTANT
if (mongoose.models.Product) {
  delete mongoose.models.Product;
}

export default mongoose.model<IProduct>("Product", ProductSchema);
