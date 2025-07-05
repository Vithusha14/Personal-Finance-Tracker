import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    targetAmount: { type: Number, required: true, min: 0 }, // Ensure positive savings goal
    currentAmount: { type: Number, default: 0, min: 0 }, // Track progress
    deadline: { type: Date, required: true },
    description: { type: String, default: "" },
    autoSave: { type: Boolean, default: false }, // Automatically allocate savings if enabled
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Goal = mongoose.models.Goal || mongoose.model("Goal", goalSchema);   //we will use this as reference ;

export default Goal;
