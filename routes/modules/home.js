const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");
const { formatDate } = require("../../utils");

router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    let records = await Record.find({ userId })
      .sort({ date: "desc" })
      .populate("categoryId")
      .lean();
    const categories = await Category.find({}).lean();
    records = records.map((record) => {
      record.date = formatDate(record.date);
      return record;
    });
    res.render("index", { records, categories });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
