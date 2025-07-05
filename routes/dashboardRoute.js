import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();


/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     description: Fetch total user count and all transactions
 *     tags: [Admin Dashboard]
 *     responses:
 *       200:
 *         description: Successfully retrieved dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalUsers:
 *                       type: integer
 *                       example: 100
 *                     transactions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "6512a4bdef"
 *                           amount:
 *                             type: number
 *                             example: 250.75
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *       500:
 *         description: Internal server error
 */

dashboardRouter.get("/", getDashboardStats);

export default dashboardRouter;
//the admin see all the users id's count and transaction 