const { type } = require("@hapi/joi/lib/extend");
const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("Users");
const bcrypt = require("bcryptjs");

let messages = [];
let typeMsg = "";

const mainUser = (req, res) => {
  try {
    res.render("user/main", {
      messages: null,
      type: null,
      user: req.session.user,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const settingsPage = (req, res) => {
  let userId = req.session.user.id;

  try {
    User.findOne({ id: userId }).then((user) => {
      if (!user) {
        try {
          messages.push({ text: "User not found" });
          typeMsg = "danger";
          res.render("main/login", {
            messages: messages,
            type: typeMsg,
            values: values,
          });
        } catch (err) {
          res.status(500).send({ error: err.message });
        }
      } else {
        res.render("user/settings", {
          messages: null,
          type: null,
          user: user,
        });
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  mainUser,
  settingsPage,
};
