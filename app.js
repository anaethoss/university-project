const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const multer = require("multer");

const app = express();

const User = require("./models/user");
const Books = require("./models/books");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = "public/uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(
      null,
      path.basename(
        file.originalname.split(" ").join("-"),
        path.extname(file.originalname)
      ) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage }).single("photo");
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://127.0.0.1:27017/bookstore",
  { useMongoClient: true }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "bookstore",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// CurrentUser Middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use((req, res, next) => {
  Books.find({}, (err, book) => {
    res.locals.allCat = book.reverse();
    next();
  });
});

/**
 * Routes here
 */

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/recent", (req, res) => {
  Books.find({}, (err, books) => {
    if (err) return err;
    res.render("recent", { books: books.reverse() });
  });
});

app.get("/single-book/:bookId", (req, res) => {
  Books.findById(req.params.bookId, (err, book) => {
    if (err) {
      console.log(err);
    } else {
      res.render("single-book", { book: book });
    }
  });
});

app.get("/create", isLoggedin, (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log(err);
      res.redirect("/create");
    } else {
      let title = req.body.title;
      let price = req.body.price;
      let category = req.body.category;
      let photo = req.file.path
        .replace(/\\/gi, "/")
        .toLowerCase()
        .replace("public/", "");
      let description = req.body.description;

      Books.create(
        {
          title: title,
          category: category,
          price: price,
          description: description,
          photo: photo,
          author: res.locals.currentUser
        },
        (err, book) => {
          if (err) {
            console.log(err);
            res.redirect("/create");
          } else {
            // console.log(book);
            res.redirect("/recent");
          }
        }
      );
    }
  });
});

app.get("/search", (req, res) => {
  Books.find(
    {
      $text: {
        $search: req.query.searchBook
      }
    },
    (err, book) => {
      if (err) {
        console.log(err);
        res.redirect("/");
      } else {
        res.render("search", {
          books: book,
          query: req.query.searchBook
        });
      }
    }
  );
});

/**
 * Auth Routes
 */
// Login Route
app.get("/signin", (req, res) => {
  res.render("signin");
});

// Handle signin logic
app.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/recent",
    failureRedirect: "/signin"
  })
);

app.get("/signup", function(req, res) {
  res.render("signup");
});

// Handle sign up logics
app.post("/signup", function(req, res) {
  User.register(
    new User({
      username: req.body.username,
      name: req.body.su_name,
      email: req.body.su_email,
      phone: "+88" + req.body.su_mobileNumber
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.render("signup");
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/");
      });
    }
  );
});

// Logout logic
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.status(404).render("error", { status: "404" });
});

function isLoggedin(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}

// app.get("*", (req, res) => {
//   res.statusCode = 404;
//   res.send(
//     '<h2>The Page you are looking for is not found. Error 404</h2><br><a href="/">Back to home click here</a>'
//   );
// });

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
