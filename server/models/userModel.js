const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
  role: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Users", userSchema);
