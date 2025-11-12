import { Schema, model } from 'mongoose';

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    features: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    price: {
      type: Number,
    },
    beds: {
      type: String,
    },
    bath: {
      type: String,
    },
    tag: {
      type: String,
    },
    submittername: {
      type: String,
      required: true,
    },
    submitteremail: {
      type: String,
      required: true,
    },
    submitterid: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    submitternid: {
      type: String,
      required: false,
    },
    submitterphoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Property = model('Property', propertySchema);
