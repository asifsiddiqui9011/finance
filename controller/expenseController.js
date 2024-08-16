const Expense = require("../models/expenses");
// const fetchUser = require("../middleware/fetchUser")
const User = require("../models/users.js")


//create a new expense
exports.createExpense = async (req,res)=>{
    try {
        const { tag, description, amount, expense_date} = req.body;

        // Check for missing required fields
        if (!tag || !description || !expense_date || !amount) {
          return res.status(400).json({ message: "Missing required fields" });
        }
        
        const userID = req.user.id
        console.log(userID,"userIDDD")
        const expense = new Expense ({
            
            tag,
            description,
            amount,
            expense_date,
            user:userID
        })
   
        await expense.save();
        console.log(expense,"expnesess")
        let objId =expense.id;
        console.log(`${objId}`,userID)
        const use = await User.findByIdAndUpdate(userID,{$push:{expense:[objId]}});
        console.log(use)
        console.log("saved");
        res.json({
            success:true,
        })
        // res.status(201).json({message:"Expense have been saved"});
    } catch (error) {
        console.error("Error adding expense:", error); // Log the error details
        res
          .status(500)
          .json({ message: "Error adding expense", error: error.message || error });
      }
}

//delete expense
exports.deleteExpense = async (req, res) => {
    try {
      const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
      if (!deletedExpense) {
        return res.status(500).json({ message: "Expense deleting Error" });
      }
      res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting Expense", error });
    }
  };

  // Update a user by ID
exports.updateExpense = async (req, res) => {
    try {
      const { tag, description, amount, expense_date } = req.body;
  
      // Hash the password if it's being updated
      const updateData = {
       tag,
       description,
       amount,
       expense_date
      };
  
      const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  };


//Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const userID = req.user.id
    const expense = await Expense.find({user:userID});
    // console.log(expense)
    res.send(expense);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};