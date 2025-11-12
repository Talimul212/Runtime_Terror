import { Schema, model } from 'mongoose';

const constSchema = new Schema(
  {
    costName: {
      type: String,
    },
    costAmount: {
      type: Number,
    },
    costDate: {
      type: Date,
    },
    costType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Cost = model('Cost', constSchema);
