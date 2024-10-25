import jwt from "jsonwebtoken";
import Proj from "../model/projSchema.js";

export const createProj = async (req, res) => {
  try {
    const {
      projectname,
      description,
      availableSlots,
      technology,
      roles,
      deadline,
    } = req.body;

    console.log(req.body);

    if (
      !projectname ||
      !description ||
      !availableSlots ||
      !technology ||
      !roles ||
      !deadline
    ) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate.getTime())) {
      return res.status(400).json({ error: "Invalid deadline date" });
    }

    deadlineDate.setDate(deadlineDate.getDate() + 1); // Adding one day to deadline

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const Email = decoded.email;
    console.log(Email + " email");

    const proj = await Proj.create({
      projectname,
      description,
      availableSlots,
      technology,
      collegename: decoded.collegename,
      year: decoded.year,
      roles,
      deadline: deadlineDate,
      email: Email,
    });

    res.status(201).json({ msg: "Project created successfully", proj });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserProject = async (req, res) => {
  try {
    const Token = req.headers.authorization?.split(" ")[1];
    if (!Token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(Token, process.env.SECRET_KEY);

    const Email = decoded.email;

    const getAll = await Proj.find({ email: Email });

    res.status(200).json({ msg: "All projects ", getAll });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" + err });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const getAll = await Proj.find({});
    res.status(200).json({ msg: "All projects ", getAll });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const filterData = async (req, res) => {
  const { collegename, year } = req.query;

  const filter = {};

  if (collegename) {
    filter.collegename = { $regex: collegename, $options: "i" };
  }

  if (year) {
    filter.year = year;
  }

  try {
    const projects = await Proj.find(filter);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const UpdatePost = async (req, res) => {
  try {
    const userid = req.params.id;

    const {
      projectname,
      description,
      availableSlots,
      technology,
      roles,
      deadline,
    } = req.body;

    console.log(req.body);

    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const updatedData = {
      projectname,
      description,
      availableSlots,
      technology,
      roles,
      deadline,
      collegename: decoded.collegename,
      year: decoded.year,
      email: decoded.email,
    };

    const updated = await Proj.findByIdAndUpdate(
      userid,
      { $set: updatedData },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }

    // console.log(updated);
    res
      .status(200)
      .json({ msg: "Project updated successfully", project: updated });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const DeletePost = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    const deleteddata = await Proj.findByIdAndDelete(userId);

    if (!deleteddata) {
      res.status(200).send({ msg: "Project not found" });
    }

    await User.updateMany(
      { savedProjects: projectId },
      { $pull: { savedProjects: projectId } }
    );

    res
      .status(200)
      .json({ msg: "Project deleted successfully", deletedData: deleteddata });
  } catch (err) {
    res.status(500).send({ msg: err });
  }
};

export const getSingleproj = async (req, res) => {
  try {
    const userId = req.params.id;

    const data = await Proj.findById(userId);

    res.status(200).send({ msg: "Project fetched successfully", data });
  } catch (err) {
    res.status(500).send({ msg: "Internal server error" });
  }
};
