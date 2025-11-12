import { Schema, model } from 'mongoose';

const noticeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Notice = model('Notice', noticeSchema);
