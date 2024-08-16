const Budget = require("../models/budget");
const User = require("../models/users")
const fetchUser = require("../middleware/fetchUser")

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
        console.log(`${objId}`,userID)
        const use = await User.findByIdAndUpdate(userID,{$push:{budget:[objId]}});
        console.log(use)
        console.log("saved");
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
      res.status(200).json(updatedBudget);
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
