import { Schema, model } from 'mongoose';

const serviceSchema = new Schema(
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
    postStatus: {
      type: String,
      require: false,
    },
    submitterName: {
      type: String,
      required: true,
    },
    submitterEmail: {
      type: String,
      required: true,
    },
    submitterId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    submitterNid: {
      type: String,
      required: false,
    },
    submitterPhoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Services = model('Services', serviceSchema);
