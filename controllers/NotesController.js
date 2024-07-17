const handleResponse = require("../helpers/handleResponse");
const isLoggedIn = require("../middlewares/isLoggedIn");
const NotesValidations = require("../validations/NotesValidations");
const Notes = require("../models/Notes");

exports.AddNote = [
  isLoggedIn,
  NotesValidations.AddNotes,
  async (req, res) => {
    try {
      const { title, content } = req.body;

      const note = new Notes({ title, content, user: req?.user?._id });
      await note.save();
      return handleResponse.successMessage(
        res,
        "Note Created Successfully!",
        note
      );
    } catch (err) {
      return handleResponse.errorMessage(res, err?.message);
    }
  },
];

exports.GetAllNotes = [
  isLoggedIn,

  async (req, res) => {
    try {
      const notes = await Notes.find({ user: req?.user?._id });

      if (!notes.length) {
        return handleResponse.errorMessage(res, "No Notes Found!");
      }
      return handleResponse.successMessageWithData(
        res,
        "Note retrieve Successfully!",
        notes
      );
    } catch (err) {
      return handleResponse.errorMessage(res, err?.message);
    }
  },
];

exports.Update = [
  isLoggedIn,
  NotesValidations.Update,
  async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      if (!note) {
        return handleResponse.errorMessage(res, "No Note Found!");
      }

      const updatedNotes = await Notes.findByIdAndUpdate(
        req.params.id,
        {
          title: req?.body?.title || note?.title,
          content: req?.body?.content || note?.content,
        },
        { new: true }
      );

      return handleResponse.successMessageWithData(
        res,
        "Note Updated Successfully!",
        updatedNotes
      );
    } catch (err) {
      return handleResponse.errorMessage(res, err.message);
    }
  },
];

exports.Delete = [
  isLoggedIn,
  NotesValidations.Delete,
  async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      if (!note) {
        return handleResponse.errorMessage(res, "No Note Found!");
      }
      await Notes.findByIdAndDelete(req.params.id);

      return handleResponse.successMessage(res, "Note Deleted Successfully!");
    } catch (err) {
      return handleResponse.errorMessage(res, err.message);
    }
  },
];
