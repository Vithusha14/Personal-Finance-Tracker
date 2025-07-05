import express from "express";
import { 
  createRecurringTransaction, 
  getRecurringTransactions, 
  deleteRecurringTransaction 
} from "../controllers/recurringController.js";
import { userAuth } from "../middlewares/userMiddleware.js";

const recurringRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Recurring Transactions
 *   description: API for managing recurring transactions
 */

/**
 * @swagger
 * /api/recurring/create:
 *   post:
 *     summary: Create a new recurring transaction
 *     description: Adds a new recurring transaction for a user.
 *     tags: [Recurring Transactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - title
 *               - amount
 *               - recurrence
 *               - startDate
 *               - nextDueDate
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user.
 *               title:
 *                 type: string
 *                 description: Title of the recurring transaction.
 *               amount:
 *                 type: number
 *                 description: Amount of the transaction.
 *               recurrence:
 *                 type: string
 *                 enum: [daily, weekly, monthly]
 *                 description: Frequency of the transaction.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the transaction.
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the transaction (optional).
 *               nextDueDate:
 *                 type: string
 *                 format: date
 *                 description: The next due date.
 *     responses:
 *       201:
 *         description: Recurring transaction created successfully.
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Unauthorized.
 */

// Create a recurring transaction
//recurringRouter.post("/", userAuth, createRecurringTransaction);
recurringRouter.post("/create", userAuth, createRecurringTransaction);


/**
 * @swagger
 * /api/recurring/{userId}:
 *   get:
 *     summary: Get all recurring transactions for a user
 *     description: Retrieves all recurring transactions associated with a user.
 *     tags: [Recurring Transactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user.
 *     responses:
 *       200:
 *         description: List of recurring transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   title:
 *                     type: string
 *                   amount:
 *                     type: number
 *                   recurrence:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date
 *                   endDate:
 *                     type: string
 *                     format: date
 *                   nextDueDate:
 *                     type: string
 *                     format: date
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: User not found.
 */

// Get recurring transactions for a user
recurringRouter.get("/:id", userAuth, getRecurringTransactions);


/**
 * @swagger
 * /api/recurring//{id}:
 *   put:
 *     summary: Update a recurring transaction
 *     description: Updates an existing recurring transaction by ID.
 *     tags: [Recurring Transactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the recurring transaction to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Monthly Subscription"
 *               amount:
 *                 type: number
 *                 example: 15.99
 *               recurrence:
 *                 type: string
 *                 example: "Monthly"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-31"
 *     responses:
 *       200:
 *         description: Recurring transaction updated successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Transaction not found.
 *       500:
 *         description: Internal server error.
 */

recurringRouter.put("/:id", userAuth, getRecurringTransactions);


/**
 * @swagger
 * /api/recurring/delete/{id}:
 *   delete:
 *     summary: Delete a recurring transaction
 *     description: Deletes a specific recurring transaction.
 *     tags: [Recurring Transactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the recurring transaction.
 *     responses:
 *       200:
 *         description: Recurring transaction deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Transaction not found.
 */

// Delete a recurring transaction
recurringRouter.delete("/:id", userAuth, deleteRecurringTransaction);

export default recurringRouter;
