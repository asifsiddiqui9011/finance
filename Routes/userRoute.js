const express = require("express");
const userController = require("../controller/userController");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

// User routes
router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.post("/login",userController.userLogin);
router.post("/getUserDetails",fetchUser, userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
