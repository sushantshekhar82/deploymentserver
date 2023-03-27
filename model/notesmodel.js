const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  title: String,
  body: String,
  sub: String,
  userId: String,
});
const NoteModel = mongoose.model("note", notesSchema);

module.exports = { NoteModel };
