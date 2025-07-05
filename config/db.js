import mongoose from "mongoose";
const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });
        mongoose.connection.on("disconnected", () => {
            console.log("Disconnected from MongoDB");
        });
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log(error);
    }
};
export default connectDB;