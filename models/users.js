const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  income:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"income"
  }],
  expense:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"expense"
  }],
  budget:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"budget"
  }],

});

// Middleware to update the updated_at field on document update
userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
