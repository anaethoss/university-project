var express = require("express");
var router = express.Router();

/* GET All books page. */
router.get("/", function(req, res, next) {
  res.render("recent", { title: "Book List Page" });
});

module.exports = router;
