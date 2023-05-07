const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

// creat new page
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
    await Record.create({ userId, ...data });
    req.flash("success_msg", "成功新增一筆支出");
    res.redirect("/");
  } catch (e) {
    console.error(e);
  }
});

// edit page
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  Restaurant.findById({ _id, userId })
    .lean()
    .then((records) => res.render("edit", { records }))
    .catch((error) => console.error(error));
});

module.exports = router;
