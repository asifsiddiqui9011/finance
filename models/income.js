const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type:Number,
    required: true,
  },
  income_date: {
    type: String,
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
incomeSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const income = mongoose.model("income", incomeSchema);

module.exports = income;
