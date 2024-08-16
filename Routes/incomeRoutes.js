const express = require("express");
const incomeController = require("../controller/incomeController");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

//Creating routes for expense
router.post("/income",fetchUser, incomeController.createIncome);
router.get("/income",fetchUser, incomeController.getAllIncome)
// router.get("/income/:id",incomeController.getExpenseById);
// router.put("/income/:id",incomeController.updateExpense);
// router.delete("/income/:id",incomeController.deleteExpense)

module.exports = router;