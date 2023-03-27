const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://sushantshekhar:sushantshekhar@cluster0.jrb6jlo.mongodb.net/?retryWrites=true&w=majority"
);

const userShema = mongoose.Schema({
  email: String,
  password: String,
  city: String,
  age: Number,
});
const UserModel = mongoose.model("user", userShema);

module.exports = { connection, UserModel };
