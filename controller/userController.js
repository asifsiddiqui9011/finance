const User = require("../models/users"); // Make sure to adjust the path of model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const secretKey = process.env.JWT_SECRETKEY

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone} = req.body;

    // Check for missing required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let check = await User.findOne({email:email});
    if (check) {
        return res.status(400).json({success:false,errors:'existing user found with same email address'})
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await user.save();
    const data = {
      user:{
          id:user.id
      }
  }
  const token = jwt.sign(data,secretKey)
  res.status(200).json({success:true,token})
  } catch (error) {
    console.error("Error creating user:", error); // Log the error details
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message || error });
  }
};


//Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

//Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Hash the password if it's being updated
    const updateData = {
      name,
      email,
      phone,
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};


//login
exports.userLogin = async (req,res) =>{
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email:email})
    if(!user){
      res.status(401).json({message:"user not found"})
    }
    else{
      bcrypt.compare(password,user.password,(err , ismatch)=>{
        if(!ismatch){
          res.status(401).json({message:"invalid password"})
        }else{
            const data = {
              user:{
                  id:user.id
              }
          }
          const token = jwt.sign(data,secretKey);
          res.status(200).json({success:true,token})
        }
      }) 
    }

  } catch (error) {
    console.error("Error during login:", error); // Log the error details
    res
      .status(500)
      .json({ message: "Error during login", error: error.message || error });
  }
}