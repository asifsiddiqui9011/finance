const express = require("express");
const budgetController = require("../controller/budgetController");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

// User routes
router.post("/budget",fetchUser, budgetController.createBudget);
router.get("/getbudget",fetchUser, budgetController.getAllBudget);
// router.get("/budget/:id", budgetController.getBudgetById);
router.patch("/budget/:id", budgetController.updateBudget);
router.delete("/budget/:id", budgetController.deleteBudget);
router.get('/budget',fetchUser,budgetController.getBudget);

module.exports = router;