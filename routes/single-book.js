var express = require("express");
var router = express.Router();

/* GET Signup page. */
router.get("/", function(req, res, next) {
  res.render("single-book", { title: "single book Page" });
});

module.exports = router;
