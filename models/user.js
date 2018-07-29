const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  password: String,
  books: {
    type: mongoose.Schema.ObjectId,
    ref: "Book"
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
