const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: true,
  },
  amount: {
    type: Number,
    default: true,
  },
  userId: {
    // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    index: true,
    required: true,
  },
});

module.exports = mongoose.model("Record", recordSchema);
