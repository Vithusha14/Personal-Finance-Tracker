import express from "express";
import { login, logout, register, resetPassword } from "../controllers/userController.js";

const userRouter = express.Router();


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               currency:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request (e.g., missing fields or user already exists)
 *       500:
 *         description: Internal Server Error
 */

// register a new user 
userRouter.post("/register",register)

/**
 * @swagger
 *  /api/auth//login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request (e.g., missing fields, user does not exist, or incorrect password)
 *       500:
 *         description: Internal Server Error
 */


// Login user 
userRouter.post("/login",login)

/**
 * @swagger
 * /api/auth//logout:
 *   post:
 *     summary: Logout the user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Internal Server Error
 *
 * 
 * 
 */


// Logout user 
userRouter.post("/logout",logout)


/**
 * @swagger
* /api/auth/reset-password:
 *   post:
 *     summary: Reset user's password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 format: password
 *             required:
 *               - newPassword
 *     parameters:
 *       - in: header
 *         name: x-reset-token
 *         required: true
 *         description: Token received for password reset (sent via email)
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Bad request (e.g., invalid or expired reset token)
 *       500:
 *         description: Internal Server Error
 */

//Reset Password 
userRouter.post("/reset-password",resetPassword)




export default userRouter

//route is we want to define what is the path
//import the express package 
//use only methods post get delete put update fetch 

//export is use the file 