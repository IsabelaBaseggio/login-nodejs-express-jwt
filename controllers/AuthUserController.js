// is not being used

const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { request } = require("express");
require("../models/User");
const User = mongoose.model("Users");
const jwt = require("jsonwebtoken");

module.exports = function (passport) {
  passport.use(
    new localStrategy({ usernameField: "email",
     passReqToCallback: true }, // allows us to pass back the entire request to the callback
      (req, email, password, done) => { // req as parameter to use req.flash
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, req.flash("error_msg", {
            text: "Incorrect email or password",
          }));
        }

        let check = bcrypt.compareSync(password, user.password);
          if (check) {
            return done(null, user);
          } else {
            return done(null, false, req.flash("error_msg", {
              text: "Incorrect email or password",
            }));
          }
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
