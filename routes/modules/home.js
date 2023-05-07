const express = require("express");
const router = express.Router();
const Record = require("../../models/record");

router.get("/", async(req, res) => {
  try {
    const userId = req.user._id;
    const records = await Record.find({ userId }).lean();
    res.render("index", { records });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
