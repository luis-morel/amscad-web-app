// Importing required Node.js packages
const bodyParser = require('body-parser'); // Body parsing middleware
const express = require('express'); // Web server framework
const logger = require('morgan')('tiny'); // HTTP request logging middleware
const passport = require('passport'); // User authentication middleware
const path = require('path'); // Directory & file path handling module
const session = require('express-session'); // Session handling middleware

// Importing database models
const db = require("./models");

// Importing API and authentication web server routes
const { api, auth } = require("./controllers");

// Express web server declaration and configuration
const app = express();
app.use(bodyParser.json()); // Adding 'bodyParser'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger); // Adding 'morgan'
app.use(session({ secret: "ILoveP1zza", resave: true, saveUninitialized: true }));
app.use(passport.initialize()); // Adding 'passport'
app.use(passport.session());
app.use("/api", api); // Adding API routes
app.use("/auth", auth); // Adding Authentication routes

// Serving up static assets (for hosting platforms such as Heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
app.use(express.static(path.join(__dirname, 'client/build')));

// Directing all requests to ReactJS app - API routes must be defined before this is executed!!!
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Express web server listening port declaration
const PORT = process.env.PORT || 5000;

// Connecting to MSSQL and then initializing Express web server
// Use ...sync({force: true})... to drop and recreate all tables - WILL WIPE ALL DATA!!!
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(`Express web server listening on port: ${PORT}!`);
  });
});