require("dotenv").config();
const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("Users");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const values = require("@hapi/joi/lib/values");

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
  let values = {
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

  if (req.body.password.length <= 7) {
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
              let token = jwt.sign(
                {
                  user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: req.body.password,
                  },
                },
                process.env.SECRET,
                { expiresIn: 10800 }
              );
              let userName = user.firstName + user.lastName;
              req.flash("success_msg", { text: "User successfully created" });
              res.redirect(`/user/${userName}`);
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

const loginUser = (req, res) => {
  messages = [];
  let values = {
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
              // User logged - session - token
              try {
                let token = jwt.sign(
                  {
                    user: {
                      id: user._id,
                      email: user.email,
                    },
                  },
                  process.env.SECRET,
                  { expiresIn: 10800 }
                );
                req.session.token = token;
                req.session.user = {
                  id: user._id,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  password: req.body.password,
                };
                let userName = user.firstName + user.lastName;
                req.flash("success_msg", { text: "User Logged" });
                res.redirect(`/user/${userName}`);
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

const createLinkResetPassword = (req, res) => {
  messages = [];
  let values = {
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
      res.render("main/reset-password", {
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
            res.render("main/reset-password", {
              messages: messages,
              type: typeMsg,
              values: values,
            });
          } catch (err) {
            res.status(500).send({ error: err.message });
          }
        } else {
          let linksSecret = process.env.SECRET + user.password;
          let tokenLink = jwt.sign(
            { id: user._id, email: user.email },
            linksSecret,
            { expiresIn: 300 }
          );
          console.log(jwt.decode(tokenLink)); /* {
            id: '63e2b710796285ad1d97fcfd',
            email: 'nome@alura.com.br',
            iat: 1675802571,
            exp: 1675802871
          } */
          /* 
          console.log(jwt.decode(tokenLink).id) -> 63e2b710796285ad1d97fcfd
          console.log(jwt.decode(tokenLink).email) -> nome@alura.com.br
          console.log(jwt.decode(tokenLink).iat) -> 1675802571
          console.log(jwt.decode(tokenLink).exp) -> 1675802571
          */
          // criar um token quando logar e registar e passar as informações do usuario para na verificação do token retornar o user junto e enviar pro front com o render, como uma variavel global
          let link = `http://localhost:3000/reset/${user._id}/${tokenLink}`;

          const transporter = nodemailer.createTransport({
            host: process.env.HOSTEMAIL,
            service: "gmail",
            port: process.env.PORTEMAIL,
            secure: true,
            auth: {
              user: process.env.USEREMAIL,
              pass: process.env.PASSEMAIL,
            },
          });

          transporter
            .sendMail({
              from: `Support Login System <${process.env.HOSTEMAIL}>`,
              to: user.email,
              subject: "Login System: password reset link",
              html: `<h1 style="font-family: Arial, Helvetica, sans-serif; font-weight: 300;">Login System</h1><p>Please click on link to reset your password: <a href="${link}">${link}</a></p>`,
            })
            .then(() => {
              messages.push({
                text: "Link sent. Please check your email, the link will expire in 5 minutes.",
              });
              typeMsg = "success";
              res.render("main/reset-password", {
                messages: messages,
                type: typeMsg,
                values: null,
              });
            })
            .catch((err) => {
              res.status(500).send({ error: err.message });
            });
        }
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }
};

const resetLinkPage = (req, res) => {
  try {
    User.findOne({ id: req.params.id }).then((user) => {
      if (!user) {
        try {
          messages.push({ text: "User not found" });
          typeMsg = "danger";
          res.render("main/reset-password", {
            messages: messages,
            type: typeMsg,
            values: values,
          });
        } catch (err) {
          res.status(500).send({ error: err.message });
        }
      } else {
        try {
          // Checking token validity
          const tokenVerify = jwt.verify(
            req.params.token,
            process.env.SECRET + user.password
          );

          res.render("main/reset-password-link", {
            id: req.params.id,
            token: req.params.token,
            messages: null,
            values: null,
          });
        } catch (err) {
          req.flash("error_msg", {
            text: "Expired link. Please enter your email again to receive a new link.",
          });
          res.redirect("/reset");
        }
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const resetingPassword = (req, res) => {
  messages = [];

  try {
    User.findById(req.params.id).then((user) => {
      if (!user) {
        try {
          messages.push({ text: "User not found" });
          typeMsg = "danger";
          res.render("main/reset-password", {
            messages: messages,
            type: typeMsg,
            values: null,
          });
        } catch (err) {
          res.status(500).send({ error: err.message });
        }
      } else {
        try {
          // Checking token validity
          const tokenVerify = jwt.verify(
            req.params.token,
            process.env.SECRET + user.password
          );

          if (
            !req.body.password ||
            typeof req.body.password == undefined ||
            req.body.password == null ||
            !req.body.password2 ||
            typeof req.body.password2 == undefined ||
            req.body.password2 == null
          ) {
            messages.push({
              text: "Please enter a new password and confirm it",
            });
          }

          // Validating passwords

          if (req.body.password.length <= 7) {
            messages.push({ text: "Password Too Short" });
          }

          if (req.body.password !== req.body.password2) {
            messages.push({ text: "Passwords do not match" });
          }

          if (messages.length > 0) {
            try {
              typeMsg = "danger";
              res.render("main/reset-password-link", {
                id: req.params.id,
                token: req.params.token,
                messages: messages,
                type: typeMsg,
              });
            } catch (err) {
              res.status(500).send({ error: err.message });
            }
          } else {
            // Encrypting password
            user.password = bcrypt.hashSync(req.body.password);

            // Saving in DB
            user.save().then(() => {
              req.flash("success_msg", {
                text: "Password successfully updated",
              });
              res.redirect("/login");
            });
          }
        } catch (err) {
          req.flash("error_msg", {
            text: "Expired link. Please enter your email again to receive a new link.",
          });
          res.redirect("/reset");
        }
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  mainIndex,
  registerPage,
  registerUser,
  loginPage,
  loginUser,
  resetPasswordPage,
  createLinkResetPassword,
  resetLinkPage,
  resetingPassword,
};
