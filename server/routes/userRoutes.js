import express from "express";
import { authUser, fetchoneUser, registerUser, updateUser } from "../controller/userController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", authUser);

router.get("/fetch",fetchoneUser);
router.post("/update",updateUser);


export default router;
