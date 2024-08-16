const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

});

// Middleware to update the updated_at field on document update
budgetSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const budget = mongoose.model("budget", budgetSchema);

module.exports = budget;
