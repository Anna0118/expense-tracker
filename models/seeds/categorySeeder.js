if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Category = require("../category");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const SEED_CATEGORY = [
  { name: "家居物業", icon: "fa-solid fa-house" },
  { name: "交通出行", icon: "fa-solid fa-van-shuttle" },
  { name: "休閒娛樂", icon: "fa-solid fa-face-grin-beam" },
  { name: "餐飲食品", icon: "fa-solid fa-utensils" },
  { name: "其他", icon: "fa-solid fa-pen" },
];

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", async () => {
  try {
    // mongodb: Delete multiple documents from a collection
    // 避免重複新增種子資料
    await Category.deleteMany({});

    await Promise.all(
      SEED_CATEGORY.map(async (category) => {
        await Category.create(category);
      })
    );
    console.log("Category seeder done.");
    await db.close();
  } catch (error) {
    console.error(error);
  }
});
