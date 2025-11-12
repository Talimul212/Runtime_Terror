import { Schema, model } from 'mongoose';

const bannerSchema = new Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Banner = model('Banner', bannerSchema);
