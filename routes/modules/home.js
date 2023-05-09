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
    // reduce() 將陣列中的所有元素相加，並返回總和, 初始值為0
    const totalAmount = await records.reduce(
      (total, record) => total + record.amount,
      0
    );

    res.render("index", { records, categories, totalAmount });
  } catch (e) {
    console.error(e);
  }
});

router.get("/category", async (req, res) => {
  try {
    const userId = req.user._id;
    const categoryId = req.query.categoryId;

    if (!categoryId) return res.redirect("/");

    const categories = await Category.find().lean();
    const selectedCategory = categories.find(
      (category) => category._id.toString() === categoryId
    );

    const records = await Record.find({ userId }).populate("categoryId").lean();

    const filterRecords = records
      .filter(
        (record) =>
          // 檢查這條記錄屬於所選的分類
          record.categoryId._id.toString() === selectedCategory._id.toString()
      )
      .map((record) => {
        record.date = formatDate(record.date);
        return record;
      });

    const totalAmount = await filterRecords.reduce(
      (total, record) => total + record.amount,
      0
    );

    res.render("index", {
      records: filterRecords,
      categories,
      totalAmount,
    });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
