// models/notificationModel.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["Spending Alert", "Bill Reminder", "Goal Reminder"], required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now } // Added updatedAt field for tracking updates
}, { timestamps: true }); // Enables automatic createdAt & updatedAt management

const NotificationModel = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default NotificationModel;
