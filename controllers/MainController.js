const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("Users");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');

let messages = [];
let typeMsg = "";

const mainIndex = (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const registerPage = (req, res) => {
  try {
    res.render("main/register", { messages: null, values: null });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const registerUser = async (req, res) => {
  messages = [];
  let values = await {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  function validadeEmail(email) {
    let stringEmail = /\S+@\S+\.\S+/;
    return stringEmail.test(email);
  }

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
    !req.body.password ||
    typeof req.body.password == undefined ||
    req.body.password == null
  ) {
    messages.push({ text: "Invalid Password" });
  }

  if (req.body.password.length <= 7 && req.body.password.length > 0) {
    messages.push({ text: "Password Too Short" });
  }

  if (messages.length > 0) {
    try {
      typeMsg = "danger";
      res.render("main/register", {
        messages: messages,
        type: typeMsg,
        values: values,
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  } else {
    try {
      // Check if email is already registered
      User.findOne({ email: values.email }).then((user) => {
        if (user) {
          try {
            messages.push({ text: "Email Is Already Registered" });
            typeMsg = "danger";
            res.render("main/register", {
              messages: messages,
              type: typeMsg,
              values: values,
            });
          } catch (err) {
            res.status(500).send({ error: err.message });
          }
        } else {
          try {
            // Registering new user
            const newUser = new User({
              ...values,
              password: bcrypt.hashSync(req.body.password),
            });

            newUser.save().then(() => {
              req.flash("success_msg", { text: "User Successfully Created" });
              res.redirect("/user/");
            });
          } catch (err) {
            res.status(500).send({ error: err.message });
          }
        }
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
};

const loginPage = (req, res) => {
  try {
    res.render("main/login", { messages: null, values: null });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  messages = [];
  let values = await {
    email: req.body.email,
  };

  if (
    !values.email ||
    typeof values.email == undefined ||
    values.email == null ||
    !req.body.password ||
    typeof req.body.password == undefined ||
    req.body.password == null
  ) {
    messages.push({ text: "Incorrect email or password" });
  }

  if (messages.length > 0) {
    try {
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
    try {
      // Check if email is already registered
      User.findOne({ email: values.email }).then((user) => {
        if (!user) {
          try {
            messages.push({ text: "Incorrect email or password" });
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
          try {
            const passwordAndEmailMarch = bcrypt.compareSync(
              req.body.password,
              user.password
            );

            // Comparing passwords
            if (!passwordAndEmailMarch) {
              messages.push({ text: "Incorrect email or password" });
              typeMsg = "danger";
              res.render("main/login", {
                messages: messages,
                type: typeMsg,
                values: values,
              });
            } else {
              // Logging in user
              try {
                req.flash("success_msg", { text: "User Logged" });
                res.redirect("/user/");
              } catch (err) {
                res.status(500).send({ error: err.message });
              }
            }
          } catch (err) {
            res.status(500).send({ error: err.message });
          }
        }
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
};

const resetPasswordPage = (req, res) => {
  try {
    res.render("main/reset-password", { messages: null, values: null });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const resetPassword = async (req, res) => {
  messages = [];
  let values = await {
    email: req.body.email,
  };

  if (
    !values.email ||
    typeof values.email == undefined ||
    values.email == null
  ) {
    messages.push({ text: "Incorrect email address" });
  }

  if (messages.length > 0) {
    try {
      typeMsg = "danger";
      res.render("main/reset", {
        messages: messages,
        type: typeMsg,
        values: values,
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  } else {
    try {
      // Check if email is registered
      User.findOne({ email: values.email }).then((user) => {
        if (!user) {
          try {
            messages.push({ text: "Incorrect email address" });
            typeMsg = "danger";
            res.render("main/reset", {
              messages: messages,
              type: typeMsg,
              values: values,
            });
          } catch (err) {
            res.status(500).send({ error: err.message });
          }
        } else {

          try {
            
            const transport = nodemailer.createTransport({
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: {
                user: "23ee315154c1d2",
                pass: "8a672a83a6c95a"
              }
            });

            transport.sendMail({
              from: 'Administrator <a7f36c89e2-4c8ecd@inbox.mailtrap.io>',
              to: user.email,
              subject: 'Login System: password reset link',
              // html: ''
            })

          } catch (err) {
            res.status(500).send({ error: err.message });
          }

          
        }
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
};

module.exports = {
  mainIndex,
  registerPage,
  registerUser,
  loginPage,
  loginUser,
  resetPasswordPage,
  resetPassword,
};
