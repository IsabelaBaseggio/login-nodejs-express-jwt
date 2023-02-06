const { type } = require("@hapi/joi/lib/extend");
const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("Users");

let messages = [];
let typeMsg = "";

const mainUser = (req, res) => {
  try {
    // pegar string até o sinal "-" como fisrtName e a string seguinte como lastName
    // console.log(req)
    res.render("user/main", { messages: null, type: null, user: req.user});
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const settingsPage = (req, res) => {
  try {
    res.render("user/settings", { messages: null, type: null });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  mainUser,
  settingsPage,
};
