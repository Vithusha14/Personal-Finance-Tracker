import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BudgetModel from "../models/budgetModel.js";

// Create Budget Entry
export const createBudget = async (req, res) => {
    const { userId, category, amount, description, notifications } = req.body;

    if (!userId || !category || !amount) {
        return res.status(400).json({ success: false, message: "User ID, Category, and Amount are required" });
    }

    try {
        const budget = new BudgetModel({ userId, category, amount, description, notifications });
        await budget.save();

        res.status(201).json({ success: true, message: "Budget entry created successfully", budget });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get Budget Entry by ID
export const getBudget = async (req, res) => {
    try {
        const budget = await BudgetModel.find();

        if (!budget) {
            return res.status(404).json({ success: false, message: "Budget entry not found" });
        }

        res.status(200).json({ success: true, budget });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch budget entry", error: error.message });
    }
};

// Update Budget Entry
export const updateBudget = async (req, res) => {
    try {
        const updatedBudget = await BudgetModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedBudget) {
            return res.status(404).json({ success: false, message: "Budget entry not found" });
        }

        res.status(200).json({ success: true, message: "Budget entry updated successfully", updatedBudget });
    } catch (error) {
        res.status(500).json({ success: false, message: "Update failed", error: error.message });
    }
};

// Delete Budget Entry
export const deleteBudget = async (req, res) => {
    try {
        const budget = await BudgetModel.findByIdAndDelete(req.params.id);

        if (!budget) {
            return res.status(404).json({ success: false, message: "Budget entry not found" });
        }

        res.status(200).json({ success: true, message: "Budget entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Deletion failed", error: error.message });
    }
};