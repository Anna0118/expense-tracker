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
  //find category
  const categories = await Category.find();
  const categoryMap = new Map();
  categories.forEach((category) => {
    categoryMap.set(category.name, category._id);
  });
  const userPromises = SEED_USER.map((user, index) =>
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(user.password, salt))
      .then((hash) =>
        User.create({
          name: user.name,
          email: user.email,
          password: hash,
        })
      )
      .then((user) => {
        const userId = user._id;
        const userRecords = recordList.slice(index * 2, (index + 1) * 2); //(0,3), (3,6)
        const recordPromises = userRecords.map((record) => {
          record.userId = userId;
          record.categoryId = record.categoryId;
          return Record.create(record);
        });
        return Promise.all(recordPromises);
      })
  );
  Promise.all(userPromises)
    .then(() => {
      console.log("done.");
      process.exit();
    })
    .catch((error) => {
      console.error(error);
    });
});
