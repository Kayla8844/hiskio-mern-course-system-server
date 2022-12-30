const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // 和 user 關聯
  },
  students: {
    type: [String],
    default: [],
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
