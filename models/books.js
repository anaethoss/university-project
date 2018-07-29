const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define our indexes
bookSchema.index({
  title: "text",
  description: "text",
  category: "text"
});

function autopopulate(next) {
  this.populate("author");
  next();
}

bookSchema.pre("find", autopopulate);
bookSchema.pre("findOne", autopopulate);
bookSchema.pre("findById", autopopulate);

module.exports = mongoose.model("Book", bookSchema);
