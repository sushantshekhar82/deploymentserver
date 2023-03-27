const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(process.env.mongourl);

const userShema = mongoose.Schema({
  email: String,
  password: String,
  city: String,
  age: Number,
});
const UserModel = mongoose.model("user", userShema);

module.exports = { connection, UserModel };
