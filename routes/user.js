const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

// register a new user
router.post("/register", UserController.Register);

// login a user
router.post("/login", UserController.Login);

// get logged in user
router.get("/", UserController.GetLoggedInUser);

// Update logged in user
router.put("/", UserController.Update);

// Delete logged in user
router.delete("/", UserController.Delete);

module.exports = router;
