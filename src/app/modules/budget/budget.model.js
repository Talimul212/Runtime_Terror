import { Schema, model } from 'mongoose';

const budgetSchema = new Schema(
  {
    budgetName: {
      type: String,
    },
    budgetAmount: {
      type: Number,
    },
    budgetDate: {
      type: Date,
    },
    budgetType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Budget = model('Budget', budgetSchema);
