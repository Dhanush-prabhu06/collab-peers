import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDb from "./config/Db.js";
import userRoutes from "./routes/userRoutes.js";
import { projRouter } from "./routes/projRoutes.js";
import { chatRoutes } from "./routes/chatRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";
//import messageController from "./controller/chatControllers/messageController.js";
import { saveMessage } from "./controller/chatControllers/messageController.js";
import { getMessagesByChannel } from "./controller/chatControllers/messageController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// HTTP server and Socket.io setup
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// Database connection
connectDb();

// Middlewares
app.use(cors());
app.use(express.json({ strict: false }));
app.use("/api/user", userRoutes);
app.use("/api", projRouter);
app.use("/api/", chatRoutes);

// Socket.io connection setup
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("message", async (data) => {
    console.log(data);
    const { username, message, channel } = data;
    console.log(`Message received: ${message} from ${username} in ${channel}`);
    await saveMessage(username, message, channel);
    io.emit("message", { username, message, channel });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
