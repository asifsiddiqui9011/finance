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
        const expense = new Expense ({
            
            tag,
            description,
            amount,
            expense_date,
            user:userID
        })
   
        await expense.save();
        // console.log(expense,"expnesess")
        let objId =expense.id;
        const use = await User.findByIdAndUpdate(userID,{$push:{expense:[objId]}});
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
      const expense = await Expense.findById(req.params.id);
      if(!expense) {
        return res.status(404).json({message:"Expense not found"})
      }
      const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
      if (!deletedExpense) {
        return res.status(500).json({ message: "Expense deleting Error" });
      }
      const userID = req.user.id
      let objId = req.params.id
      try {
        const user = await User.findByIdAndUpdate(userID, { $pull: { expense: objId } });
      } catch (error) {
        console.error("Error updating User:", error); 
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
      res.status(200).json({success:true});
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




exports.getExpense = async (req, res) => {
  try {
    const userID = req.user.id;

    // Base filter to ensure expenses are filtered by the authenticated user
    let filter = { user: userID };

    const startDate = req.query.startDate; // Start date in "YYYY-MM-DD" format
    const endDate = req.query.endDate; // End date in "YYYY-MM-DD" format
    const month = req.query.month; // Month in "MM" format
    const year = req.query.year; // Year in "YYYY" format

    if (startDate && endDate) {
      // Filter by specific date range
      filter.expense_date = {
        $gte: startDate, // Greater than or equal to startDate
        $lte: endDate,   // Less than or equal to endDate
      };
    } else if (month && year) {
      // Filter by month and year
      const monthStart = `${year}-${month}-01`; // Start of the month
      const monthEnd = new Date(year, parseInt(month), 0).toISOString().slice(0, 10); // Last day of the month in "YYYY-MM-DD" format
      
      filter.expense_date = {
        $gte: monthStart, // Greater than or equal to the first day of the month
        $lte: monthEnd,   // Less than or equal to the last day of the month
      };
    } else if (year) {
      // Filter by year only
      filter.expense_date = {
        $regex: `^${year}-`, // Matches any date starting with the specified year (e.g., "2024-")
      };
    }

    // Fetch the filtered expenses from the database
    const expenses = await Expense.find(filter);
    
    // Respond with the filtered expenses
    res.send(expenses);
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ message: "Error retrieving expenses" });
  }
};

