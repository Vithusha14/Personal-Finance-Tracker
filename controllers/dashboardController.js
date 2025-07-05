import UserModel from "../models/userModel.js";
import TransactionModel from "../models/transactionModel.js"; // Assuming you have a Transaction model

export const getDashboardStats = async (req, res) => {
    try {
        
        // Count total users
        const totalUsers = await UserModel.countDocuments();

        // Fetch all transactions
        const allTransactions = await TransactionModel.find().sort({ createdAt: -1 }); // Sorting by latest transactions

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                transactions: allTransactions
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching dashboard data", error: error.message });
    }
};
