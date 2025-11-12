import { Schema, model } from 'mongoose';

const workSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    location: {
      type: String,
    },
    features: {
      type: String,
    },
    workStatus: {
      type: String,
      enum: ['Not Started', 'Running', 'Completed'],
      default: 'Not Started',
    },
  },
  {
    timestamps: true,
  }
);

export const Work = model('Work', workSchema);
