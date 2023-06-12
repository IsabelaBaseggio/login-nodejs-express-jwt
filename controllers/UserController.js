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
      admin: false,
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
      user: req.session.user,
      logoutModal: false,
      deleteModal: false,
      admin: false,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updatingUser = async (req, res) => {
  messages = [];
  let values = await {
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim(),
  };

  // Validating email characters
  function validadeEmail(email) {
    let stringEmail = /\S+@\S+\.\S+/;
    return stringEmail.test(email);
  }

  // Getting user by id
  User.findOne({ _id: req.body.userId }).then((user) => {
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

      if (req.body.password.length !== 0 && req.body.password.length <= 7) {
        messages.push({ text: "Invalid Password" });
      }

      if (messages.length > 0) {
        try {
          let userName = user.firstName + user.lastName;

          if (user.admin) {
            req.flash("error_msg", messages);
            res.redirect(`/admin/${userName}/settings`);
          } else {
            req.flash("error_msg", messages);
            res.redirect(`/user/${userName}/settings`);
          }
        } catch (err) {
          res.status(500).send({ error: err.message });
        }
      } else {
        // Saving new user data

        user.firstName = values.firstName;
        user.lastName = values.lastName;
        user.email = values.email;

        if (req.body.password > 7) {
          user.password = bcrypt.hashSync(req.body.password);
        }

        user
          .save()
          .then(() => {
            req.session.user = user;

            let userName =
              req.session.user.firstName + req.session.user.lastName;

            if (user.admin) {
              req.flash("success_msg", { text: "User Updated" });
              res.redirect(`/admin/${userName}/settings`);
            } else {
              req.flash("success_msg", { text: "User Updated" });
              res.redirect(`/user/${userName}/settings`);
            }
          })
          .catch((err) => {
            res.status.send({ error: err.message });
          });
      }
    }
  }).catch((err) => {
    res.status(500).send({ error: err.message });
  });
};

const deleteConfirm = (req, res) => {

  // Getting user by id
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
            admin: false
          });
        }
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    }).catch((err) => {

      res.status(500).send({ error: err.message });
    });
};

const deleteAccount = async (req, res) => {
  try {
    // Deleting user by id
    await User.deleteOne({ _id: req.params.id });
    req.flash("success_msg", { text: "Account successfully deleted" });
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const logoutConfirm = (req, res) => {
  try {
    // Redering logout modal
    res.render("user/settings", {
      messages: null,
      type: null,
      user: req.session.user,
      logoutModal: true,
      deleteModal: false,
      admin: false
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const logoutAccount = (req, res, next) => {
  try {
    // Loggin out user account
    req.logout((err) => {
      if (err) {
        return next(err);
      }
  
      req.flash("success_msg", { text: "Account successfully logged out"});
      res.redirect("/");
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }

};

module.exports = {
  mainUser,
  settingsPage,
  updatingUser,
  deleteConfirm,
  deleteAccount,
  logoutConfirm,
  logoutAccount,
};
