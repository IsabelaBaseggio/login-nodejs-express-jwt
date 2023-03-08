const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { request } = require("express");
require("../models/User");
const User = mongoose.model("Users");

module.exports = function (passport) {
  passport.use(
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, { messages: "Incorrect email or password" });
        }

        bcrypt.compareSync(password, user.password, (err, check) => {
          if (check) {
            return done(null, user, { messages: "User Logged" });
          } else {
            return done(null, false, {
              messages: "Incorrect email or password",
            });
          }
        });
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
