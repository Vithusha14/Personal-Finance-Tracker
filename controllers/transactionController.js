import Transaction from "../models/transactionModel.js";
import mongoose from "mongoose";
import { getExchangeRate } from "../utils/exchangeRate.js";
import UserModel from "../models/userModel.js";


const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) {
      return amount;
    }
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = amount * exchangeRate;
    return convertedAmount;
  };

// Create a new transaction with custom tags
export const createTransaction = async (req, res) => {
    const { amount, category, tags = [], type, date, description , currency} = req.body;
    const { userId } = req.body;  

// Ensure userId is available

    if (!amount || !category || !type) {
        return res.status(400).json({ success: false, message: "Amount, category, and type are required" });

    }
    const user=await UserModel.findById(userId)
    const convertedAmount = await convertCurrency (amount,currency, user.currency);
    try {
        const transaction = new Transaction({
            user: userId,
            amount: convertedAmount,
            category,
            tags: Array.isArray(tags) ? tags : [], // Ensure tags is an array
            type,
            date: date ? new Date(date) : new Date(), // Ensure valid date
            description, 
            currency
        });

        await transaction.save();
        res.status(201).json({ success: true, message: "Transaction created successfully", transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get all transactions for a user
export const getTransactions = async (req, res) => {
    const { userId } = req.body;
    try {
        const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });
        res.status(200).json({ success: true, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch transactions", error: error.message });
    }
};

// Get a single transaction by ID
export const getTransactionById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid transaction ID" });
    }

    try {
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        res.status(200).json({ success: true, transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch transaction", error: error.message });
    }
};

// Get transactions by tag
export const getTransactionsByTag = async (req, res) => {
    const { userId } = req.body;
    const { tag } = req.params;

    try {
        const transactions = await Transaction.find({
            user: userId,
            tags: { $in: [tag] } // Ensures it matches even if there are multiple tags
        });

        res.status(200).json({ success: true, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching transactions by tag", error: error.message });
    }
};


// Update a transaction
export const updateTransaction = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid transaction ID" });
    }

    try {
        const transaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        res.status(200).json({ success: true, message: "Transaction updated successfully", transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update transaction", error: error.message });
    }
};
// Delete a transaction
export const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid transaction ID" });
    }

    try {
        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        res.status(200).json({ success: true, message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete transaction", error: error.message });
    }
};