import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    category: { 
        type: String, 
        enum: ["Food", "Transport", "Entertainment", "Utilities", "Other", "Salary"]
    },
    tags: { type: [String], default: [] }, // Example: ["work", "vacation"]
    type: { type: String, enum: ["income", "expense"], required: true },
    description: { type: String },
    currency :{ type : String , default : "LKR"},
});

const transactionModel =mongoose.models.transaction || mongoose.model('transaction',transactionSchema) //we will use this as reference 
export default transactionModel;