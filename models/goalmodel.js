const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  completed: {
    type: Boolean,
    default: false
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

});

module.exports = mongoose.model("Goal", goalSchema);