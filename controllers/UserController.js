const User = require("../models/User");

// let messages = [];

const pagesRegister = (req, res) => {
    try {
      res.render("user/register", {messages: null});
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

const registerUser = async (req, res) => {
    let messages = [];

    if(!req.body.firstName || typeof req.body.firstName == undefined || req.body.firstName == null) {
        messages.push({text: "Invalid First Name"});
    }

    if(!req.body.lastName || typeof req.body.lastName == undefined || req.body.lastName == null) {
        messages.push({text: "Invalid Last Name"});
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        messages.push({text: "Invalid Email"});
    }

    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
        messages.push({text: "Invalid Password"});
    }

    if(req.body.password.length <= 7 && req.body.password.length > 0){
        messages.push({text: "Password Too Short"})
    }

    if(messages.length > 0){
        res.render('user/register', {messages: messages, type: "danger"});
    }
}

module.exports = {
    pagesRegister,
    registerUser
}