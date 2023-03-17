const { type } = require("@hapi/joi/lib/extend");
const mongoose = require("mongoose");
const User = require("../models/User");
const Users = mongoose.model("Users");
const bcrypt = require("bcryptjs");

let messages = [];
let typeMsg = "";

const mainUser = (req, res) => {
  try {
    res.render("user/main", {
      messages: null,
      type: null,
      user: req.session.user,
      logoutModal: false
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
          deleteModal: false
        });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updatingUser = async (req, res) => {
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

  try {
    Users.findOne({ id: req.body.userId }).then((user) => {
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
  
        if(req.body.password.length !== 0 && req.body.password.length <= 7){
  
        messages.push({ text: "Invalid Password" });
  
        }
  
        if (messages.length > 0) {
          try {
            let userName = user.firstName + user.lastName;
            req.flash("error_msg", messages);
            res.redirect(`/user/${userName}/settings`);
          } catch (err) {
            res.status(500).send({ error: err.message });
          }
        } else {
          let userData;
 
          if(req.body.password.length > 7){
            userData = {...values, password: bcrypt.hashSync(req.body.password)};
          } else {
            userData = {...values};
          }
  
          try {
            User.updateOne({_id: req.body.userId}, userData).then(() => {
              req.session.user = {id: req.body.userId, ...userData};
              console.log(req.session.user);
    
              let userName = req.session.user.firstName + req.session.user.lastName;
    
              req.flash("success_msg", { text: "User Updated" });
              res.redirect(`/user/${userName}/settings`);
            }).catch((err) => {
              res.status(500).send({ error: err.message });
            })
          } catch (err) {
            res.status(500).send({ error: err.message });
          }   
        }
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }

};

const deleteConfirm = (req, res) => {

  try {
    
    Users.findOne({_id: req.body.userId}).then((user) => {

      try {
        
        if (!user){

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
            deleteModal: true
          }); 

        }

      } catch (err) {
        
        res.status(500).send({ error: err.message });

      }

    })

  } catch (err) {
    res.status(500).send({ error: err.message });
  }

}

const deleteAccount = async (req, res) => {

  try {

    await Users.deleteOne({_id: req.params.id});
    req.flash("success_msg", { text: "User account successfully deleted" });
    res.redirect("/");

  } catch (err) {
    res.status(500).send({ error: err.message });
  }

}

const logoutConfirm = (req, res) => {

  try {
    
    res.render("user/main", {
      messages: null,
      type: null,
      user: req.session.user,
      logoutModal: true
    }); 

  } catch (err) {
    res.status(500).send({ error: err.message });
  }

}

module.exports = {
  mainUser,
  settingsPage,
  updatingUser,
  deleteConfirm,
  deleteAccount,
  logoutConfirm
};
