// routes/notificationRoutes.js
import express from "express";
import { createNotification, getNotifications, markAsRead } from "../controllers/notificationController.js";

const notificationRouter = express.Router();



//create a new notification
notificationRouter.post("/create", createNotification);

//get notifications for a user
notificationRouter.get("/user/:userId", getNotifications);

//mark a notification as read
notificationRouter.put("/read/:notificationId", markAsRead);

export default notificationRouter;
