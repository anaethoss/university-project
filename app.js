var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
// var logger = require('morgan');

var indexRouter = require("./routes/index");
var recentRouter = require("./routes/recent");
var signinRouter = require("./routes/signin");
var signupRouter = require("./routes/signup");
var chatRouter = require("./routes/chat");
var categoriesRouter = require("./routes/categories");
var singleBookRouter = require("./routes/single-book");
var createRouter = require("./routes/create");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/recent", recentRouter);
app.use("/categories", categoriesRouter);
app.use("/signin", signinRouter);
app.use("/signup", signupRouter);
app.use("/chat", chatRouter);
app.use("/single-book", singleBookRouter);
app.use("/create", createRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
