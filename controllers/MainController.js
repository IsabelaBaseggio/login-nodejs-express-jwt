const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("Users");

const mainIndex = (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const resetPage = (req, res) => {
  try {
    res.render("main/reset", {messages: null, values: null});
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const resetPassword = (req, res) => {
  messages = [];
  let values = {
    email: req.body.email,
  };

  if (
    !values.email ||
    typeof values.email == undefined ||
    values.email == null) {
    messages.push({ text: "Incorrect email address" });
  }

  if (messages.length > 0) {
    typeMsg = "danger";
    res.render("main/reset", {
      messages: messages,
      type: typeMsg,
      values: values,
    });
  } else {
    // Check if email is registered
    User.findOne({email: values.email}).then((user) => {
      if(!user){
        messages.push({ text: "Incorrect email address" });
        typeMsg = "danger";
        res.render("main/reset", {
          messages: messages,
          type: typeMsg,
          values: values,
        });
      }
    })
  }
}


module.exports = {
  mainIndex,
  resetPage,
  resetPassword,
};
