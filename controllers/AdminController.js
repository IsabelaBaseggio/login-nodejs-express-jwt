const { type } = require("@hapi/joi/lib/extend");
const mongoose = require("mongoose");
require("../models/User")
const User = mongoose.model("Users");
const bcrypt = require("bcryptjs");

let messages = [];
let typeMsg = "";

const mainAdmin = async (req, res) => {
  
  try {

    const usersList = await User.find({admin: false});

    res.render("user/main", {
      messages: null,
      type: null,
      usersList,
      admin: true
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const settingsPage = (req, res) => {
  try {
    res.render("user/settings", {
      messages: null,
      type: null,
      logoutModal: false,
      deleteModal: false,
      admin: true
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const deleteConfirm = (req, res) => {
  try {
    User.findOne({ _id: req.body.userId }).then((user) => {
      try {
        if (!user) {
          messages.push({ text: "User not found" });
          typeMsg = "danger";
          res.render("main/login", {
            messages: messages,
            type: typeMsg,
            values: null,
          });
        } else {
          res.render("user/settings", {
            messages: null,
            type: null,
            user: req.session.user,
            logoutModal: false, 
            deleteModal: true,
            admin: true
          });
        }
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const logoutConfirm = (req, res) => {
  try {
    res.render("user/settings", {
      messages: null,
      type: null,
      user: req.session.user,
      logoutModal: true,
      deleteModal: false,
      admin: true
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


module.exports = {
    mainAdmin,
    settingsPage,
    deleteConfirm,
    logoutConfirm
};