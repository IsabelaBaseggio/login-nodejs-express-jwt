require("dotenv").config();
const express = require("express");
const path = require("path");
const mainRoute = require("./routes/main");
const userRoute = require("./routes/user");
const session = require('express-session');
const flash = require('connect-flash');
const connectDB = require("./database/db");

// Init Express App
const app = express();

// Port Number
const port = process.env.PORT;

//Configs

// Parse JSON Data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session, Cookies & Flash
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// Middleware - Flash
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.messages = req.flash('messages');
  res.locals.user = req.session || null;
  next();
})

// EJS
app.set("view engine", "ejs");

// Mongoose - DB Connection
connectDB();

// Public
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", express.json(), mainRoute);
app.use("/user", express.json(), userRoute);

// Server
app.listen(port, () => {
  console.log(`Server running in ${port}`);
});
