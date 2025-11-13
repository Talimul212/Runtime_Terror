import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String }, // e.g., Remote, Hybrid, On-site
    location: { type: String },
    company: { type: String },
    category: { type: String }, // e.g., Frontend, Backend
    provider: { type: String }, // optional: same as company or external recruiter
    tags: [{ type: String }], // optional: for filtering or search
    relatedSkills: [{ type: String }], // renamed from skills for consistency
    cost: { type: String, enum: ["Free", "Paid"] }, // optional: for internships or training jobs
    platform: { type: String }, // optional: job board or hiring platform
    url: { type: String }, // optional: application link
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
