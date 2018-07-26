const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Book Store", loggedIn: false });
});

/* GET All books page. */
router.get("/create", function(req, res, next) {
  res.render("create", { title: "Book List Page", loggedIn: false });
});

/* GET All books page. */
router.get("/recent", function(req, res, next) {
  res.render("recent", { title: "Book List Page", loggedIn: false });
});

/* GET Login page. */
router.get("/signin", function(req, res, next) {
  res.render("signin", { title: "Book List Page", loggedIn: false });
});

router.get("/signup", function(req, res, next) {
  res.render("signup", { title: "Book List Page", loggedIn: true });
});

/* GET single book page. */
router.get("/single-book", function(req, res, next) {
  res.render("single-book", { title: "single book Page", loggedIn: false });
});

router.get("*", function(req, res, next) {
  res.statusCode = 404;
  res.send("The page you looking for is not found");
});

module.exports = router;
