const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  content: { type: String, required: true},
  date: { type: Date },
});

// Virtual for Post's URL
PostSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/Post/${this._id}`;
});

// Export model
module.exports = mongoose.model("Post", PostSchema);