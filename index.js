require("dotenv").config();
const express = require("express");
const path = require("path");
const mainRoute = require("./routes/main");

const app = express();
const port = process.env.PORT;

//Configurações

// Outros
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("view engine", "ejs");

// Public
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(mainRoute);

// Server
app.listen(port, () => {
  console.log(`Server running in ${port}`);
});
