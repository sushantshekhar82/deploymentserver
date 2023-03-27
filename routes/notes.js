const express = require("express");
const notesRouter = express.Router();
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { NoteModel } = require("../model/notesmodel");

notesRouter.get("/", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "masai");
  if (decoded) {
    const data = await NoteModel.find({ userId: decoded.userId });
    res.status(200).send(data);
  } else {
    res.status(400).send("No notes found create your notes");
  }
});

notesRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const data = new NoteModel(payload);
    await data.save();
    res.status(200).send("Notes added");
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
notesRouter.patch("/:noteid", async (req, res) => {
  const { noteid } = req.params;
  const payload = req.body;
  try {
    await NoteModel.findByIdAndUpdate(noteid, payload);
    res.status(200).send({ msg: "Note has been updated" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
notesRouter.delete("/:noteid", async (req, res) => {
  const { noteid } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "masai");
  const req_id = decoded.userId;
  const userId_note = NoteModel.findOne({ _id: noteid });

  try {
    if (req_id === userId_note) {
      await NoteModel.findByIdAndDelete({ _id: noteid });
      res.status(200).send({ msg: "Note has been deleted" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});
module.exports = notesRouter;
