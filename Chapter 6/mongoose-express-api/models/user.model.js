import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/,"Please enter proper Email Address"]
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 12,
    validate: {
      validator: (val) => /[!@#\$%\^&\*]/.test(val),
      message: 'Password must include a special character.'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  roles: {
    type: [String],
    enum: ['user', 'admin'],
    default: ['user']
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }]
}, {
  timestamps: true
});

userSchema.virtual('postCount', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
  count: true
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

userSchema.methods.greet = function () {
  return `Hello, ${this.name}`;
};

userSchema.pre('save', function (next) {
  console.log(`User ${this.name} is being saved...`);
  next();
});

export const User = model('User', userSchema);
