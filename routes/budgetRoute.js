 import express from "express";
 import { createBudget, getBudget, updateBudget, deleteBudget } from "../controllers/budgetController.js";
 import { userAuth } from "../middlewares/userMiddleware.js";  

 const budgetRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Budget
 *   description: API for managing budget entries
 */

/**
 * @swagger
 * /api/budget/create:
 *   post:
 *     summary: Create a new budget entry
 *     tags: [Budget]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               category:
 *                 type: string
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               notifications:
 *                 type: boolean
 *             required:
 *               - userId
 *               - category
 *               - amount
 *     responses:
 *       201:
 *         description: Budget entry created successfully
 *       400:
 *         description: Invalid input data
 */


// Create a new budget entry
budgetRouter.post("/create", userAuth, createBudget);


/**
 * @swagger
 * /api/budget:
 *   get:
 *     summary: Get all budget entries
 *     description: Retrieves all budget entries for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Budget
 *     responses:
 *       200:
 *         description: Budget entries retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 budget:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       category:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: No budget entries found
 *       500:
 *         description: Server error
 */


// Get a budget entry by ID
budgetRouter.get("/", userAuth, getBudget);

/**
 * @swagger
 * /api/budget/update/{id}:
 *   put:
 *     summary: Update a budget entry
 *     description: Updates an existing budget entry by ID.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Budget
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the budget entry to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the budget entry
 *               amount:
 *                 type: number
 *                 description: The updated amount
 *               category:
 *                 type: string
 *                 description: The updated category
 *     responses:
 *       200:
 *         description: Budget entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 updatedBudget:
 *                   type: object
 *       404:
 *         description: Budget entry not found
 *       500:
 *         description: Update failed due to server error
 */


// Update a budget entry by ID 
budgetRouter.put("/update/:id", userAuth, updateBudget);


/**
 * @swagger
 * /api/budget/delete/{id}:
 *   delete:
 *     summary: Delete a budget entry by ID
 *     tags: [Budget]
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
 *         description: Budget entry deleted successfully
 *       404:
 *         description: Budget entry not found
 */

// Delete a budget entry by ID
budgetRouter.delete("/delete/:id", userAuth, deleteBudget)

export default budgetRouter;

