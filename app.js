var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var sequelize = require("./data");

var User = require("./models/user");

var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database syncronized");
  })
  .catch(err => console.log("error trying to syncronize the db", err.message));

module.exports = app;
