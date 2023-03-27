const express = require("express");
const app = express();
require("dotenv").config();
const { connection } = require("./db");
const { auth } = require("./middleware/auth");
const notesRouter = require("./routes/notes");
const userRouter = require("./routes/user");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use(auth);
app.use("/notes", notesRouter);
app.listen(process.env.port, async () => {
  await connection;
  console.log("connect with local mongo ");
});
