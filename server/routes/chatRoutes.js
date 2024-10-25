import express from "express";

import { getMessagesByChannel } from "../controller/chatControllers/messageController.js";
import { getAllUsers } from "../controller/chatControllers/getAllUsers.js";
import {
  getDirectMessages,
  sendDirectMessage,
} from "../controller/chatControllers/directMessageController.js";

const router = express.Router();

//post req routes
router.post("/direct-message/:user1/:user2", sendDirectMessage);

//get req
router.get("/direct-message/:user1/:user2", getDirectMessages);
router.get("/messages/:channel", getMessagesByChannel);
router.get("/userall", getAllUsers);

export { router as chatRoutes };
