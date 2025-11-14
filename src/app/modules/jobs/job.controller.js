import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "./job.service.js";

export const postJob = async (req, res) => {
  try {
    const job = await createJob(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const fetchJobs = async (req, res) => {
  try {
    const jobs = await getAllJobs(req.query);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchJobById = async (req, res) => {
  try {
    const job = await getJobById(req.params.id);
    console.log(job);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const modifyJob = async (req, res) => {
  try {
    const updated = await updateJob(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const removeJob = async (req, res) => {
  try {
    await deleteJob(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
