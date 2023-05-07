const mongoose = require("mongoose");
const Category = require("../category");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", async () => {
  const categories = [
    { name: "家居物業" },
    { name: "交通出行" },
    { name: "休閒娛樂" },
    { name: "餐飲食品" },
    { name: "其他" },
  ];

  try {
    await Promise.all(
      categories.map(async (category) => {
        await Category.create(category);
      })
    );
    console.log("Category seeder done.");
    await db.close();
  } catch (error) {
    console.error(error);
  }
});
