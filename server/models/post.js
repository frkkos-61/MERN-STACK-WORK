const mongoose = require("mongoose");

const PostSchmea = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    //required: true,
    trim: true,
  },
 description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("post", PostSchmea);
