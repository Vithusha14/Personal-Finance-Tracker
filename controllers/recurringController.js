// Controller (recurringController.js)
import RecurringTransaction from "../models/recurringModel.js";

export const createRecurringTransaction = async (req, res) => {
    try {
        const {userId}= req.body.userId
        const {  title, amount, recurrence, startDate, endDate } = req.body;
        let nextDueDate = new Date(startDate);
        const newTransaction = new RecurringTransaction({
            userId, title, amount, recurrence, startDate, endDate, nextDueDate
        });
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecurringTransactions = async (req, res) => {
    try {
        const transactions = await RecurringTransaction.find({ userId: req.params.userId });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRecurringTransaction = async (req, res) => {
    try {
        await RecurringTransaction.findByIdAndDelete(req.params.id);
        res.json({ message: "Recurring transaction deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};