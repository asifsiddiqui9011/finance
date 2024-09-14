const express = require("express");
const expenseController = require("../controller/expenseController");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

//Creating routes for expense
router.post("/expense",fetchUser, expenseController.createExpense);
router.get("/allexpense",fetchUser, expenseController.getAllExpenses)
// router.get("/expense/:id",expenseController.getExpenseById);
router.patch("/expense/:id",fetchUser,expenseController.updateExpense);
router.delete("/expense/:id",fetchUser,expenseController.deleteExpense)
router.get('/expenses',fetchUser,expenseController.getExpense);
module.exports = router;