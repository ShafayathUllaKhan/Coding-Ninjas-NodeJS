import mongoose from "mongoose";
const { Schema, model } = mongoose;

// (Many-to-Many with Users)
const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

export const Group = model('Group', groupSchema);
