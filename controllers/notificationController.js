import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import NotificationModel from "../models/notificationModel.js"; // controllers/notificationController.js

// Create Notification
export const createNotification = async (req, res) => {
    try {
        const { userId, message, type } = req.body;
        const notification = new NotificationModel({ userId, message, type });
        await notification.save();
        res.status(201).json({ success: true, message: "Notification created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get Notifications for a User
export const getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await NotificationModel.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Mark Notification as Read
export const markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        await NotificationModel.findByIdAndUpdate(notificationId, { isRead: true });
        res.status(200).json({ success: true, message: "Notification marked as read" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};