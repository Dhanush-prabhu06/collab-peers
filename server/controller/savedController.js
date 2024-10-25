dotenv.config();
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Saved from "../model/savedProjschema.js";
import Proj from "../model/projSchema.js";

export const saveProject = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const project = await Proj.findById(userId);
    console.log(project);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    let saved = await Saved.findOne({ email: decoded.email });

    if (!saved) {
      saved = new Saved({ email: decoded.email, savedProjects: [] });
    }

    if (saved.savedProjects.includes(userId)) {
      return res.status(400).json({ msg: "Project already saved" });
    }

    saved.savedProjects.push(userId);
    await saved.save();

    res.status(200).json({
      msg: "Project saved successfully",
      savedProjects: saved.savedProjects,
    });
  } catch (error) {
    console.error("Error saving project:", error);
    res
      .status(500)
      .json({ msg: "Error saving project", error: error.message || error });
  }
};

export const getAllsaved = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded JWT:", decoded);

    const saved = await Saved.findOne({ email: decoded.email })
      .populate("savedProjects")
      .exec();

    console.log("Saved projects (expanded):", JSON.stringify(saved, null, 2));

    if (!saved) {
      return res
        .status(404)
        .json({ msg: "No saved projects found for this user" });
    }

    if (!saved.savedProjects || saved.savedProjects.length === 0) {
      return res
        .status(404)
        .json({ msg: "No saved projects found for this user" });
    }

    res.status(200).json({
      msg: "Saved projects retrieved successfully",
      savedProjects: saved.savedProjects,
    });
  } catch (err) {
    console.error("Error fetching saved projects:", err);
    res
      .status(500)
      .json({ msg: "Internal server error", error: err.message || err });
  }
};

export const deleteSavedProject = async (req, res) => {
  const userId = req.params.id;

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const saved = await Saved.findOne({ email: decoded.email });

    if (!saved) {
      return res
        .status(404)
        .json({ msg: "No saved projects found for this user" });
    }

    const projectId = userId.toString();

    console.log("Current saved projects:", saved.savedProjects);

    const projectExists = saved.savedProjects.some(
      (id) => id.toString() === projectId
    );

    if (!projectExists) {
      return res
        .status(400)
        .json({ msg: "Project not found in saved projects" });
    }

    saved.savedProjects = saved.savedProjects.filter(
      (id) => id.toString() !== projectId
    );

    console.log("Updated saved projects:", saved.savedProjects);

    await saved.save();

    res.status(200).json({
      msg: "Project deleted from saved projects successfully",
      savedProjects: saved.savedProjects,
    });
  } catch (error) {
    console.error("Error deleting saved project:", error);
    res.status(500).json({
      msg: "Error deleting saved project",
      error: error.message || error,
    });
  }
};
