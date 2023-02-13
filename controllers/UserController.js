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
            values: null,
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

const updatingUser = (req, res) => {
  messages = [];
  let values = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  function validadeEmail(email) {
    let stringEmail = /\S+@\S+\.\S+/;
    return stringEmail.test(email);
  }

  User.findOne({ email: values.email }).then((user) => {
    if (!user) {
      try {
        messages.push({ text: "User not found" });
        typeMsg = "danger";
        res.render("main/login", {
          messages: messages,
          type: typeMsg,
          values: null,
        });
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    } else {
      // Form Validation
      if (
        !values.firstName ||
        typeof values.firstName == undefined ||
        values.firstName == null
      ) {
        messages.push({ text: "Invalid First Name" });
      }

      if (
        !values.lastName ||
        typeof values.lastName == undefined ||
        values.lastName == null
      ) {
        messages.push({ text: "Invalid Last Name" });
      }

      if (
        !values.email ||
        typeof values.email == undefined ||
        values.email == null ||
        validadeEmail(values.email) == false
      ) {
        messages.push({ text: "Invalid Email" });
      }

      if (
        req.body.password ||
        typeof req.body.password != undefined ||
        (req.body.password != null && req.body.password.length <= 7)
      ) {
        messages.push({ text: "Invalid Password" });
      }

      if (messages.length > 0) {
        try {
          let userName = user.firstName + user.lastName;
          req.flash("messages", {type: "danger", text: messages});
          res.redirect(`/user/${userName}`);
        } catch (err) {
          res.status(500).send({ error: err.message });
        }
      }
    }
  });
};

module.exports = {
  mainUser,
  settingsPage,
  updatingUser,
};
