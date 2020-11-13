//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

const workout = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const posts = {
    workoutName: req.body.workoutName,
    timeSpent: req.body.workoutTime,
  };

  workout.push(posts);

  var currentDay = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = currentDay.toLocaleDateString("en-US", options);

  res.render("home", {
    todayDate: day,
    workoutName: posts.workoutName,
    timeSpent: posts.timeSpent,
    workouts: workout,
  });
});

app.post("home", function () {
  res.redirect("/index.html");
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
