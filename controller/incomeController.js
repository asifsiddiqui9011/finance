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
        console.log(userID,"userIDDD")
        const income = new Income ({

            tag,
            amount,
            income_date,
            user:userID
        })
   
        await income.save();
        console.log(income,"income")
        let objId =income.id;
        console.log(`${objId}`,userID)
        const use = await User.findByIdAndUpdate(userID,{$push:{income:[objId]}});
        console.log(use)
        console.log("saved");
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
      const deletedIncome = await Salary.findByIdAndDelete(req.params.id);
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
      res.status(200).json(updatedIncome);
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

