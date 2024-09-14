const Budget = require("../models/budget");
const User = require("../models/users")


//create a new expense
exports.createBudget = async (req,res)=>{
    try {
        const { tag, amount, month, year } = req.body;

        // Check for missing required fields
        if (!tag || !amount || !month ||!year) {
          return res.status(400).json({ message: "Missing required fields" });
        }
        
        const userID = req.user.id
        console.log(userID,"userIDDD")
        const budget = new Budget  ({
            
            tag,
            amount,
            month,
            year,
            user:userID
        })

   
        await budget.save();
        console.log(budget,"budget")
        let objId =budget.id;
        const use = await User.findByIdAndUpdate(userID,{$push:{budget:[objId]}});
        res.json({
            success:true,
        })
        //  res.status(201).json({message:"Budget have been saved"});
    } catch (error) {
        console.error("Error adding Budget:", error); // Log the error details
        res
          .status(500)
          .json({ message: "Error adding expense", error: error.message || error });
      }
}

//delete expense
exports.deleteBudget = async (req, res) => {
    try {
      const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
      if (!deletedExpense) {
        return res.status(500).json({ message: "Expense deleting Error" });
      }
      res.status(200).json({ message: "Budget deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting Budget", error });
    }
  };

  // Update a user by ID
exports.updateBudget = async (req, res) => {
    try {
      const { tag, amount, month } = req.body;
  
      // Hash the password if it's being updated
      const updateData = {
       tag,
       amount,
       month
      };
  
      const updatedBudget = await Budget.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({success:true});
    } catch (error) {
      res.status(500).json({ message: "Error updating Budget", error });
    }
  };


  //get all budget
  exports.getAllBudget = async (req, res) => {
    try {
      const userID = req.user.id
      const budget = await Budget.find({user:userID});
      res.send(budget);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users", error });
    }
  };


  exports.getBudget = async (req, res) => {
    try {
      const userID = req.user.id;
  
     
      let filter = { user: userID };
  
      const startDate = req.query.startDate; // Start date in "YYYY-MM-DD" format
      const endDate = req.query.endDate; // End date in "YYYY-MM-DD" format
      const month = req.query.month; // Month in "MM" format
      const year = req.query.year; // Year in "YYYY" format
  
      if (startDate && endDate) {
        // Filter by specific date range
        filter.created_at = {
          $gte: startDate, // Greater than or equal to startDate
          $lte: endDate,   // Less than or equal to endDate
        };
      } else if (month && year) {
        // Filter by month and year
        const monthStart = `${year}-${month}-01`; // Start of the month
        const monthEnd = new Date(year, parseInt(month), 0).toISOString().slice(0, 10); // Last day of the month in "YYYY-MM-DD" format
        
        filter.created_at = {
          $gte: monthStart, // Greater than or equal to the first day of the month
          $lte: monthEnd,   // Less than or equal to the last day of the month
        };
      } else if (year) {
        // Filter by year only
        filter.created_at = {
          $regex: `^${year}-`, // Matches any date starting with the specified year (e.g., "2024-")
        };
      }
  
      // Fetch the filtered expenses from the database
      const budget = await Budget.find(filter);
      
      // Respond with the filtered expenses
      res.send(budget);
    } catch (error) {
      console.error("Error retrieving expenses:", error);
      res.status(500).json({ message: "Error retrieving expenses" });
    }
  };
  
  