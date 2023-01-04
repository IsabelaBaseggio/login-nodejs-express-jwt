const { type } = require("@hapi/joi/lib/extend");
const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("Users");
const bcrypt = require('bcryptjs');

let messages = [];
let typeMsg = '';


const pagesRegister = (req, res) => {
    try {
      res.render("user/register", {messages: null, values: null});
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

const registerUser = async (req, res) => {
    let values = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };


    function validadeEmail(email){
        let stringEmail = /\S+@\S+\.\S+/;
        return stringEmail.test(email);
    }

    // Form Validation
    if(!values.firstName || typeof values.firstName == undefined || values.firstName == null) {
        messages.push({text: "Invalid First Name"});
    }

    if(!values.lastName || typeof values.lastName == undefined || values.lastName == null) {
        messages.push({text: "Invalid Last Name"});
    }

    if(!values.email || typeof values.email == undefined || values.email == null || validadeEmail(values.email) == false) {
        messages.push({text: "Invalid Email" });
    }

    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
        messages.push({text: "Invalid Password"});
    }

    if(req.body.password.length <= 7 && req.body.password.length > 0){
        messages.push({text: "Password Too Short"})
    }

    if(messages.length > 0){
        typeMsg = 'danger';
        res.render('user/register', {messages: messages, type: typeMsg, values: values});
    } else {

        // Check if email is already registered
        User.findOne({email: values.email}).then((user) => {
            if(user) {
                messages.push({text: "Email Is Already Registered"})
                typeMsg = 'danger';
                res.render('user/register', {messages: messages, type: typeMsg, values: values})
            } else {
                // Registering new user
                const newUser = new User({...values, password: bcrypt.hashSync(req.body.password)});

                try {
                    newUser.save().then(() => {
                    req.flash('success_msg', {text: 'User Successfully Created'})
                    res.redirect('/user/');
                    })
                } catch (err) {
                    res.status(500).send({ error: err.message});
                }
            }
        })


    }
}

const mainUser = (req, res) => {
    try {
      res.render("user/main", {messages: null, type: null});
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

module.exports = {
    pagesRegister,
    registerUser,
    mainUser
}