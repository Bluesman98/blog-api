const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postID: {type: String, required: true},
  author: { type: String, required: true, maxLength: 100 },
  content: { type: String, required: true, maxLength: 100 },
  date: { type: Date },
});

// Virtual for Comment's full name
CommentSchema.virtual("name").get(function () {
  // To avoid errors in cases where an Comment does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  if (!this.first_name || !this.family_name) {
    fullname = "";
  }
  return fullname;
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);