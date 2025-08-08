import { Group } from "../models/group.model.js";

export const createGroup = async (req, res) => {
  try {
    const group = new Group(req.body);
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getGroups = async (req, res) => {
  const groups = await Group.find().populate("members");
  res.json(groups);
};

export const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate("members");
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json({ message: "Group deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
