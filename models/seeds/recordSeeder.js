const Record = require("../record");
const db = require("../../config/mongoose");
const User = require("../user");
const Category = require("../category");
const bcrypt = require("bcryptjs");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const recordList = require("../../seeder.json").results;
const SEED_USER = require("./user.json");
console.log(SEED_USER);

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", async () => {
  try {
    //find category
    const categories = await Category.find();
    const categoryMap = new Map();
    categories.forEach((category) => {
      categoryMap.set(category.name, category._id);
    });

    // Iterate through each seed user
    const userPromises = SEED_USER.map(async (user, index) => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      // Create a user with hashed password
      const newUser = await User.create({
        name: user.name,
        email: user.email,
        password: hash,
      });

      // Calculate records per user
      const recordsPerUser = Math.ceil(recordList.length / SEED_USER.length);
      // Get records for the current user
    //   const userId = newUser._id;
      const userRecords = recordList.slice(
        index * recordsPerUser,
        (index + 1) * recordsPerUser
      ); //(0,3), (3,6)
      const recordPromises = userRecords.map(async (record) => {
        record.userId = newUser._id;
        record.categoryId = categoryMap.get(record.categoryName);
        return Record.create(record);
      });
      await Promise.all(recordPromises);
    });

    await Promise.all(userPromises);

    console.log("done.");
    process.exit();
  } catch (error) {
    console.error(error);
  }
});
