require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./controllers/index");
var tellRouter = require("./controllers/tells");
var visitorRouter = require("./controllers/visitors");
var likesRouteer = require("./controllers/likes");

var app = express();

var corsOptions = {
  origin: process.env.FE_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/tell", tellRouter);
app.use("/visitors", visitorRouter);
app.use("/likes", likesRouteer);
app.use("/", indexRouter);

module.exports = app;
