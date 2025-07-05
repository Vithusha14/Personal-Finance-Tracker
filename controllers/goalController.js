import Goal from "../models/goalModel.js";
import mongoose from "mongoose";

// Create a new financial goal
export const createGoal = async (req, res) => {
    const { title, targetAmount, deadline, description, autoSave } = req.body;
    const userId = req.body.userId ;

    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized: User ID not found" });
    }

    if (!title || !targetAmount || !deadline) {
        return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    try {
        const goal = new Goal({ userId, title, targetAmount, deadline, description, autoSave });
        await goal.save();
        res.status(201).json({ success: true, message: "Goal created successfully", goal });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating goal", error: error.message });
    }
};

// Get all goals for the logged-in user
export const getGoals = async (req, res) => {
    const userId =req.body.userId ;

    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized: User ID not found" });
    }

    try {
        const goals = await Goal.find({ userId });
        res.status(200).json({ success: true, goals });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching goals", error: error.message });
    }
};

// Get a specific goal by ID
export const getGoalById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid goal ID" });
    }

    try {
        const goal = await Goal.findById(id);
        if (!goal) {
            return res.status(404).json({ success: false, message: "Goal not found" });
        }
        res.status(200).json({ success: true, goal });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching goal", error: error.message });
    }
};

// Update goal details
export const updateGoal = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid goal ID" });
    }

    try {
        const goal = await Goal.findByIdAndUpdate(id, updatedData, { new: true });
        if (!goal) {
            return res.status(404).json({ success: false, message: "Goal not found" });
        }
        res.status(200).json({ success: true, message: "Goal updated successfully", goal });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating goal", error: error.message });
    }
};

// Update goal progress (e.g., adding savings)
export const updateGoalProgress = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid goal ID" });
    }

    if (amount <= 0) {
        return res.status(400).json({ success: false, message: "Amount must be greater than zero" });
    }

    try {
        const goal = await Goal.findById(id);
        if (!goal) {
            return res.status(404).json({ success: false, message: "Goal not found" });
        }
        goal.currentAmount += amount;
        await goal.save();
        res.status(200).json({ success: true, message: "Goal progress updated", goal });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating goal progress", error: error.message });
    }
};

// Delete a goal
export const deleteGoal = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid goal ID" });
    }

    try {
        const goal = await Goal.findByIdAndDelete(id);
        if (!goal) {
            return res.status(404).json({ success: false, message: "Goal not found" });
        }
        res.status(200).json({ success: true, message: "Goal deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting goal", error: error.message });
    }
};
