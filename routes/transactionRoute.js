import express from "express";
import { 
    createTransaction, 
    getTransactions, 
    getTransactionById, 
    getTransactionsByTag, 
    updateTransaction, 
    deleteTransaction 
} from "../controllers/transactionController.js";
import { userAuth } from "../middlewares/userMiddleware.js";
import { generateFinancialReport } from "../controllers/financialReportController.js";

const transactionRouter = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Transactions
 *     description: API endpoints related to transactions
 */

/**
 * @swagger
 * /api/transaction/create:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               type:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               currency:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */

// Create a new transaction
transactionRouter.post("/create", userAuth, createTransaction);

/**
 * @swagger
 * /api/transaction/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transactions]
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
 *         description: Transaction details
 *       400:
 *         description: Invalid transaction ID
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Failed to fetch transaction
 */


// Get a specific transaction by ID
transactionRouter.get("/:id", userAuth, getTransactionById);


/**
 * @swagger
 * /api/transaction/tag/{tag}:
 *   get:
 *     summary: Get transactions by tag
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: tag
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of transactions with the specified tag
 *       500:
 *         description: Error fetching transactions
 */


// Get transactions by tag
transactionRouter.get("/tag/:tag", userAuth, getTransactionsByTag);

/**
 * @swagger
 * /api/transaction/update/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
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
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               type:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               description:
 *                 type: string
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       400:
 *         description: Invalid transaction ID
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Failed to update transaction
 */

// Update a transaction
transactionRouter.put("/update/:id", userAuth, updateTransaction);

/**
 * @swagger
 * /api/transaction/delete/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
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
 *         description: Transaction deleted successfully
 *       400:
 *         description: Invalid transaction ID
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Failed to delete transaction
 */

// Delete a transaction
transactionRouter.delete("/delete/:id", userAuth, deleteTransaction);

/**
 * @swagger
 * /api/transaction/financial-report:
 *   post:
 *     summary: Generate a financial report
 *     description: Retrieves total income, total expenses, and category breakdown for a user.
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "65a8d1c5e1a4b3a7c4f97d2e"
 *     responses:
 *       200:
 *         description: Successfully generated financial report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 report:
 *                   type: object
 *                   properties:
 *                     totalIncome:
 *                       type: number
 *                       example: 5000
 *                     totalExpense:
 *                       type: number
 *                       example: 3000
 *                     netBalance:
 *                       type: number
 *                       example: 2000
 *                     categoryBreakdown:
 *                       type: object
 *                       example:
 *                         food: 1000
 *                         transport: 500
 *                         rent: 1500
 *       400:
 *         description: Missing user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User ID is required"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to generate financial report"
 */
transactionRouter.post("/financial-report", generateFinancialReport);


export default transactionRouter;
