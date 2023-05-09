const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");
const { formatDate } = require("../../utils");

// 新增頁面
router.get("/new", async (req, res) => {
  try {
    const categories = await Category.find().lean();
    res.render("new", { categories });
  } catch (e) {
    console.error(e);
  }
});

// 新增一筆支出
router.post("/create", async (req, res) => {
  try {
    const userId = req.user._id;
    const data = req.body;
    data.date = formatDate(data.date);
    await Record.create({ userId, ...data });
    req.flash("success_msg", "成功新增一筆支出");
    res.redirect("/");
  } catch (e) {
    console.error(e);
  }
});

// 瀏覽一筆支出
router.get("/:id/edit", async (req, res) => {
  try {
    const userId = req.user._id;
    const _id = req.params.id;
    const userRecord = await Record.findOne({ _id, userId })
      .populate("categoryId")
      .lean();
    userRecord.date = formatDate(userRecord.date);
    const categoryName = userRecord.categoryId.name;
    const categories = await Category.find({}).lean();
    res.render("edit", { userRecord, categories, categoryName });
  } catch (e) {
    console.error(e);
  }
});

// 編輯一筆支出
router.put("/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const _id = req.params.id;
    const data = req.body;
    await Record.findByIdAndUpdate({ _id, userId }, data);
    req.flash("success_msg", "編輯成功");
    res.redirect("/");
  } catch (e) {
    console.error(e);
  }
});

//刪除一筆支出
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const _id = req.params.id;
    const data = req.body;
    await Record.findById({ _id, userId }, data).remove();
    req.flash("success_msg", "刪除成功");
    res.redirect("/");
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
