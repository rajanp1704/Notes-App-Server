const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const notesRoutes = require("./notes");

router.use("/user", userRoutes);
router.use("/notes", notesRoutes);

module.exports = router;
