import mongoose, { Schema, Document } from "mongoose";

export interface IOffer extends Document {
  title: string;
  description?: string;
  image: string;
  discountPercentage: number;
  code: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  applicableTo: "all" | "category" | "product";
  applicableCategory?: string;
  applicableProduct?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OfferSchema = new Schema<IOffer>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicableTo: {
      type: String,
      enum: ["all", "category", "product"],
      default: "all",
    },
    applicableCategory: {
      type: String,
      ref: "Category",
    },
    applicableProduct: {
      type: String,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Offer ||
  mongoose.model<IOffer>("Offer", OfferSchema);
