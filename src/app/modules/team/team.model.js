import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
    profile: {
      type: String,
    },
    about: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const TeamMember = model('TeamMember', teamSchema);
