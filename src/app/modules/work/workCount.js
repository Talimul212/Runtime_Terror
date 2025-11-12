// models/VisitCount.js
import { Schema, model } from 'mongoose';

const workCountSchema = new Schema({
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const WorkCount = model('WorkCount', workCountSchema);
