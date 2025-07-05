import Transaction from "../models/transactionModel.js";
import mongoose from "mongoose";

export const generateFinancialReport = async (req, res) => {
    const { userId } = req.body;
    
    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        const transactions = await Transaction.find({ user: userId });
        
        let totalIncome = 0;
        let totalExpense = 0;
        let categoryBreakdown = {};

        transactions.forEach(transaction => {
            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            } else if (transaction.type === "expense") {
                totalExpense += transaction.amount;
                
                if (!categoryBreakdown[transaction.category]) {
                    categoryBreakdown[transaction.category] = 0;
                }
                categoryBreakdown[transaction.category] += transaction.amount;
            }
        });

        const report = {
            totalIncome,
            totalExpense,
            netBalance: totalIncome - totalExpense,
            categoryBreakdown,
        };

        res.status(200).json({ success: true, report });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to generate financial report", error: error.message });
    }
};
