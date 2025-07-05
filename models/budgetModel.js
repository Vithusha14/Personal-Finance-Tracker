import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 }, // Ensuring amount is non-negative
    description: { type: String, default: "" },
    notifications: { type: Boolean, default: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Check if the model exists before defining it to avoid errors in hot reloads
const Budget = mongoose.models.Budget || mongoose.model("Budget", budgetSchema);

export default Budget;
