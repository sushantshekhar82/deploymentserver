const express = require("express");
const app = express();

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
app.listen(8080, async () => {
  await connection;
  console.log("connect with local mongo at 8080");
});
