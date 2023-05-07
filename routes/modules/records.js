const express = require("express");
const router = express.Router();
// const Record = require("../../models/record");

// creat page
router.get("/new", (req, res) => {
  res.render("new"); 
});

router.get("/edit", (req, res) => {
  res.render("edit");
});

module.exports = router;
