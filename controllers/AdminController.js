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
      logoutModal: false,
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
};