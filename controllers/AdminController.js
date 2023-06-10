const mongoose = require("mongoose");
require("../models/User")
const User = mongoose.model("Users");
const bcrypt = require("bcryptjs");

let messages = [];
let typeMsg = "";

const mainAdmin = async (req, res) => {
  
  try {

    // Getting registered users's list
    const usersList = await User.find({admin: false}).sort({firstName: 1});

    console.log(usersList);

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

  // Getting admin user by id to confirm delete
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
          // Rendering delete modal
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
};

const logoutConfirm = (req, res) => {
  try {
    // Rendering logout modal
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

const deleteUserConfirm = (req, res) => {

  // Getting user by id for admin to confirm delete
  User.findOne({ _id: req.params.id }).then((user) => {
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
        // Rendering delete modal
        res.render("user/settings", {
          messages: null,
          type: null,
          user: user,
          logoutModal: false,
          deleteModal: true,
          admin: req.session.user
        });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }).catch((err) => {
    res.status(500).send({ error: err.message });
  });

}

const deleteUserAccount = async (req, res) => {
  try {

    // Admin deleting user by id
    await User.deleteOne({ _id: req.params.id });

    req.flash("success_msg", { text: "User account successfully deleted" });
    res.redirect(`/admin/${req.params.admin}`);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


module.exports = {
    mainAdmin,
    settingsPage,
    deleteConfirm,
    logoutConfirm,
    deleteUserConfirm,
    deleteUserAccount
};