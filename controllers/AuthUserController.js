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
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }).then((user) => {
        if (!user) {
          return done(null, false, { messages: "Incorrect email or password" });
        }

        console.log("passed here 2")

        console.log(password)
        console.log(user.password);

        let check = bcrypt.compareSync(password, user.password);
        console.log(check);
          if (check) {
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

            // colocar o token em um cookie para autenticar o usuário
            // req.session.token = token;


            return done(null, user, { messages: "User Logged" });
          } else {
            return done(null, false, {
              messages: "Incorrect email or password",
            });
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
