const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true, 
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Users", userSchema);