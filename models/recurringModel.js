import mongoose from "mongoose";

const recurringSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: false },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    recurrence: { type: String, enum: ["daily", "weekly", "monthly"], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    nextDueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

const recurringModel =mongoose.models.recurring || mongoose.model('recurring',recurringSchema) //we will use this as reference 
export default recurringModel;