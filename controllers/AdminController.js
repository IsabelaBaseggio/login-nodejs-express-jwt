const { type } = require("@hapi/joi/lib/extend");
const mongoose = require("mongoose");
require("../models/User")
const User = mongoose.model("Users");
const bcrypt = require("bcryptjs");

let messages = [];
let typeMsg = "";

const mainAdmin = (req, res) => {
  
  try {
    res.render("admin/main", {
      messages: null,
      type: null,
      user: req.session.user,
      logoutModal: false,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


module.exports = {
    mainAdmin,
};