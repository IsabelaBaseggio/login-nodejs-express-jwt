const User = require("../models/User");

const registerPage = (req, res) => {
    try {
      res.render("user/register");
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }

const registerUser = async (req, res) => {
    var errors = [];

    if(!req.body.firstName || typeof req.body.firstName == undefined || req.body.firstName == null) {
        errors.push({text: "Invalid First Name"});
    }

    if(!req.body.lastName || typeof req.body.lastName == undefined || req.body.lastName == null) {
        errors.push({text: "Invalid Last Name"});
    }

    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
        errors.push({text: "Invalid Password"});
    }

    if(req.body.password.length <= 7){
        errors.push({text: "Password Too Short"})
    }

    if(errors.length > 0){
        res.render('main/register', {errors: errors});
    }
}

module.exports = {
    registerPage,
    registerUser
}