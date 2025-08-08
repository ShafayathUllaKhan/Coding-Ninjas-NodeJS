import mongoose from "mongoose";
const { Schema, model } = mongoose;

// (One-to-One with User)
const profileSchema = new Schema({
  bio: String,
  birthday: Date,
  website: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true
  }
});

export const Profile = model('Profile', profileSchema);
