import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
  image: string;
  active: boolean;
}

const BannerSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

if (mongoose.models.Banner) {
  delete mongoose.models.Banner;
}

export default mongoose.model("Banner", BannerSchema);
