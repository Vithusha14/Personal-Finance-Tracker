//routes/adminRoute.js
import express from "express";

//const {authMiddleware , isAdmin} = require("../middlewares/userMiddlewares.js");

import User from "../models/userModel.js";
const router = express.Router();

// Admin-only route to get all users 
router.get("/users", adminAuth, isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


})

export default router;