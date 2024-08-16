const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type:Number,
    required: true,
  },
  expense_date: {
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
expenseSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Expense = mongoose.model("expense", expenseSchema);

module.exports = Expense;
