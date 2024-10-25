import express from "express";
import {
  createProj,
  DeletePost,
  filterData,
  getAllProjects,
  getSingleproj,
  getUserProject,
  UpdatePost,
} from "../controller/projController.js";
import {
  deleteSavedProject,
  getAllsaved,
  saveProject,
} from "../controller/savedController.js";

const router = express.Router();

router.post("/project/create", createProj);

router.get("/project/my-project", getUserProject);

router.get("/getAllProjects", getAllProjects);

router.get("/project/filterdata", filterData);

router.put("/project/update/:id", UpdatePost);

router.delete("/project/delete/:id", DeletePost);

router.post("/project/save/:id", saveProject);

router.delete("/project/unsave/:id", deleteSavedProject);

router.get("/project/savedproject", getAllsaved);

router.get("/project/user/:id", getSingleproj);

export { router as projRouter };
