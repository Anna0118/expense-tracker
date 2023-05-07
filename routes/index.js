const express = require("express");
const router = express.Router();

const home = require("./modules/home");
const expenses = require("./modules/expenses");
const users = require("./modules/users");
const auth = require("./modules/auth");

// const { authenticator } = require("../middleware/auth");

// router.use("/expanses", authenticator, expenses);
// router.use("/expenses", expenses);
// router.use("/users", users);
// router.use("/auth", auth);
router.use("/", home);

module.exports = router;
