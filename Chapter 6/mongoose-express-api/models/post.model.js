import mongoose from "mongoose";
const { Schema, model } = mongoose;

// (One-to-Many with User) have a doubt
const postSchema = new Schema({
  title: String,
  content: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export const Post = model('Post', postSchema);
