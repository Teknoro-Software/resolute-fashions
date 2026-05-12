import mongoose, { Schema, Document } from "mongoose";
import "../models/Category";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  images: string[];
  stock: number;
  sizes: string[];
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
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
    category: {
      type: String,
      required: true,
      ref: "Category",
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    sizes: {
      type: [String],
      required: true,
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
