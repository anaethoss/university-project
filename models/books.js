const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  category: String,
  price: Number,
  description: String,
  photo: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: Date.now
});

module.exports = mongoose.model("Book", bookSchema);
