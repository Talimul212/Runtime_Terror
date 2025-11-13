import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String },
    location: { type: String },
    company: { type: String },
    category: { type: String },
    provider: { type: String },
    tags: [{ type: String }],
    relatedSkills: [{ type: String }],
    cost: { type: String, enum: ["Free", "Paid"] },
    platform: { type: String },
    url: { type: String },
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;
