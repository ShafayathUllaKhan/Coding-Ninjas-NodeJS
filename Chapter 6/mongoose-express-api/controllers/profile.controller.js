import { Profile } from "../models/profile.model.js";

export const createProfile = async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProfiles = async (req, res) => {
  const profiles = await Profile.find().populate("user");
  res.json(profiles);
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate("user");
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
