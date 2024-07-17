const express = require("express");
const router = express.Router();

const NotesController = require("../controllers/NotesController");

// add a new note
router.post("/add", NotesController.AddNote);

// Get all notes
router.get("/all", NotesController.GetAllNotes);

// Update a note by ID
router.put("/:id", NotesController.Update);

// Delete a note by ID
router.delete("/:id", NotesController.Delete);

module.exports = router;
