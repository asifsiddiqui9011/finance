const Income = require("../models/income");
const User = require("../models/users")
const fetchUser = require("../middleware/fetchUser")
//create a new expense
exports.createIncome = async (req,res)=>{
    try {
        const { tag, amount, income_date} = req.body;

        // Check for missing required fields
        if (!tag || !amount || !income_date) {
          return res.status(400).json({ message: "Missing required fields" });
        }
        
        const userID = req.user.id
        const income = new Income ({

            tag,
            amount,
            income_date,
            user:userID
        })
   
        await income.save();
        let objId =income.id;
        const use = await User.findByIdAndUpdate(userID,{$push:{income:[objId]}});
        res.status(201).json({success:true});
    } catch (error) {
        console.error("Error adding income:", error); // Log the error details
        res
          .status(500)
          .json({ message: "Error adding income", error: error.message || error });
      }
}

//delete expense
exports.deleteIncome = async (req, res) => {
    try {
      const deletedIncome = await Income.findByIdAndDelete(req.params.id);
      if (!deletedIncome) {
        return res.status(500).json({ message: "Income deleting Error" });
      }
      res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting Income", error });
    }
  };

  // Update a user by ID
exports.updateIncome = async (req, res) => {
    try {
      const { tag, amount, income_date } = req.body;
  
      // Hash the password if it's being updated
      const updateData = {
       tag,
       amount,
       income_date
      };
  
      const updatedIncome = await Income.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({success:true});
    } catch (error) {
      res.status(500).json({ message: "Error updating Salary", error });
    }
  };

//get all icome
  exports.getAllIncome = async (req, res) => {
    try {
      const userID = req.user.id
      const income = await Income.find({user:userID});
      res.send(income);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users", error });
    }
  };

  
  exports.getIncome = async (req, res) => {
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
        filter.income_date = {
          $gte: startDate, // Greater than or equal to startDate
          $lte: endDate,   // Less than or equal to endDate
        };
      } else if (month && year) {
        // Filter by month and year
        const monthStart = `${year}-${month}-01`; // Start of the month
        const monthEnd = new Date(year, parseInt(month), 0).toISOString().slice(0, 10); // Last day of the month in "YYYY-MM-DD" format
        
        filter.income_date = {
          $gte: monthStart, // Greater than or equal to the first day of the month
          $lte: monthEnd,   // Less than or equal to the last day of the month
        };
      } else if (year) {
        // Filter by year only
        filter.income_date = {
          $regex: `^${year}-`, // Matches any date starting with the specified year (e.g., "2024-")
        };
      }
  
      // Fetch the filtered expenses from the database
      const income = await Income.find(filter);
      
      // Respond with the filtered expenses
      res.send(income);
    } catch (error) {
      console.error("Error retrieving Income:", error);
      res.status(500).json({ message: "Error retrieving incomes" });
    }
  };
  
  