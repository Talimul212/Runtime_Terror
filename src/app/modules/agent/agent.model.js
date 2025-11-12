import { Schema, model } from 'mongoose';

const AgentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    nid: {
      type: String,
      required: [true, 'National ID is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: 'other',
    },
    experience: {
      type: String,
      required: [true, 'Experience is required'],
      trim: true,
    },
    paymentStatus: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const PaymentSchema = new Schema(
  {
    total_amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    tran_id: {
      type: String,
      required: true,
      unique: true,
    },
    success_url: {
      type: String,
      required: true,
    },
    fail_url: {
      type: String,
      required: true,
    },
    cancel_url: {
      type: String,
      required: true,
    },
    cus_name: {
      type: String,
      required: true,
    },
    cus_email: {
      type: String,
      required: true,
    },
    cus_add1: {
      type: String,
      required: true,
    },
    shipping_method: {
      type: String,
      default: 'No',
    },
    product_name: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
      required: true,
    },
    product_profile: {
      type: String,
      required: true,
    },
    cus_country: {
      type: String,
      required: true,
    },
    cus_phone: {
      type: String,
      required: true,
    },
    multi_card_name: {
      type: String,
      required: true,
    },
    value_a: {
      type: String,
      required: true,
    },
    value_b: {
      type: String,
      required: true,
    },
    value_c: {
      type: String,
      required: true,
    },
    value_d: {
      type: String,
      required: true,
    },
    store_id: {
      type: String,
      required: false,
    },
    store_passwd: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// hashing user password

// Add a method to check if the phone number is already taken
AgentSchema.statics.emailExists = async function (phoneNumber) {
  const agent = await this.findOne({ phoneNumber });
  return !!agent;
};
export const Agent = model('Agent', AgentSchema);
export const Payment = model('Payment', PaymentSchema);
