const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("Users");

// let messages = [];


const pagesRegister = (req, res) => {
    try {
      res.render("user/register", {messages: null, valuesForm: null});
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

const registerUser = async (req, res) => {
    let messages = [];
    let valuesForm = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };


    // Form Validation
    if(!req.body.firstName || typeof req.body.firstName == undefined || req.body.firstName == null) {
        messages.push({text: "Invalid First Name"});
    }

    if(!req.body.lastName || typeof req.body.lastName == undefined || req.body.lastName == null) {
        messages.push({text: "Invalid Last Name"});
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        messages.push({text: "Invalid Email" });
    }

    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
        messages.push({text: "Invalid Password"});
    }

    if(req.body.password.length <= 7 && req.body.password.length > 0){
        messages.push({text: "Password Too Short"})
    }

    if(messages.length > 0){
        res.render('user/register', {messages: messages, type: "danger", valuesForm: valuesForm});
    } else {

        // Check if email is already registered
        User.findOne({email: valuesForm.email}).then((user) => {
            if(user) {
                messages.push({text: "Email Is Already Registered"})
                res.render('user/register', {messages: messages, type: "danger", valuesForm: valuesForm})
            }
        })


    }
}

module.exports = {
    pagesRegister,
    registerUser
}