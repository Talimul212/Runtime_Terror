import { Schema, model } from 'mongoose';

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    budgetDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Budget',
      },
    ],
    costDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Cost',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Project = model('Project', projectSchema);
