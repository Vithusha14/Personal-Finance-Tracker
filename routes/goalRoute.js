import express from "express";
import { 
  createGoal, 
  getGoals, 
  getGoalById, 
  updateGoalProgress, 
  updateGoal, 
  deleteGoal 
} from "../controllers/goalController.js";
import { userAuth } from "../middlewares/userMiddleware.js";

const goalRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: API for managing financial savings goals
 */

/**
 * @swagger
 * /api/goal/create:
 *   post:
 *     summary: Create a new financial goal
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               targetAmount:
 *                 type: number
 *               currentAmount:
 *                 type: number
 *               deadline:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               autoSave:
 *                 type: boolean
 *             required:
 *               - title
 *               - targetAmount
 *               - deadline
 *     responses:
 *       201:
 *         description: Goal created successfully
 *       400:
 *         description: Invalid input data
 */


// Create a new goal
goalRouter.post("/create", userAuth, createGoal);


/**
 * @swagger
 * /api/goal/create{id}:
 *   get:
 *     summary: Create a new financial goal
 *     description: Allows an authenticated user to create a new financial goal.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Goals
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - targetAmount
 *               - deadline
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user creating the goal
 *               title:
 *                 type: string
 *                 description: The title of the financial goal
 *               targetAmount:
 *                 type: number
 *                 description: The target amount to achieve
 *               deadline:
 *                 type: string
 *                 format: date
 *                 description: The deadline for the goal
 *               description:
 *                 type: string
 *                 description: Additional details about the goal
 *               autoSave:
 *                 type: boolean
 *                 description: Whether automatic saving is enabled for the goal
 *     responses:
 *       201:
 *         description: Goal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 goal:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     title:
 *                       type: string
 *                     targetAmount:
 *                       type: number
 *                     deadline:
 *                       type: string
 *                       format: date
 *                     description:
 *                       type: string
 *                     autoSave:
 *                       type: boolean
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */

// Get a specific goal by ID
goalRouter.get("/:id", userAuth, getGoalById);


/**
 * @swagger
 * /api/goal/update/{id}:
 *   put:
 *     summary: Update financial goal details
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               targetAmount:
 *                 type: number
 *               deadline:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               autoSave:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Goal not found
 */


// Update goal details
goalRouter.put("/update/:id", userAuth, updateGoal);



/**
 * @swagger
 * /api/goal/delete/{id}:
 *   delete:
 *     summary: Delete a financial goal by ID
 *     tags: [Goals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 *       404:
 *         description: Goal not found
 */


// Delete a goal
goalRouter.delete("/delete/:id", userAuth, deleteGoal);

export default goalRouter;

