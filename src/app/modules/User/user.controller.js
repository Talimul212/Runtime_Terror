import {
  getUserById,
  loginUser,
  registerUser,
  updateProfileInfo,
} from "./user.service.js";
import Resource from "../Resource/resource.model.js";
import User from "./user.model.js";
import Job from "../jobs/jobs.model.js";
import {
  matchJobsToUser,
  matchResourcesToUser,
} from "../../../shared/match.js";
export const register = async (req, res) => {
  try {
    const { user, token } = await registerUser(req.body); // updated to return both
    res.status(201).json({ user, token });
    console.log("Registered user:", user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  console.log(req.user);
  try {
    const user = await getUserById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updated = await updateProfileInfo(req.user.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getDashboard = async (req, res) => {
  const user = await User.findById(req.user.id);
  const jobs = await Job.find({});
  const resources = await Resource.find({});

  const matchedJobs = matchJobsToUser(user.skills, user.careerTrack, jobs);
  const matchedResources = matchResourcesToUser(user.skills, resources);

  res.status(200).json({
    profile: user,
    recommendedJobs: matchedJobs,
    recommendedResources: matchedResources,
  });
};
export default {
  register,
  login,
  getProfile,
  updateProfile,
};
