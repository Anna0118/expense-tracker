const express = require("express");
const router = express.Router();
const Record = require("../../models/record")

// creat new page
router.get("/new", (req, res) => {
  res.render("new"); 
});


// edit page
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  Restaurant.findById({ _id, userId })
    .lean()
    .then((restaurants) => res.render("edit", { restaurants }))
    .catch((error) => console.error(error));
});




module.exports = router;
