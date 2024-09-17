const port = (process.env.PORT || 3000)
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const jwt = require("jsonwebtoken");
const cors = require("cors");
require('dotenv').config();
const path = require("path");
const userRoutes = require("./Routes/userRoute");
const expenseRoutes = require("./Routes/expenseRoutes");
const budgetRoutes = require("./Routes/budgetRoutes");
const incomeRoutes = require("./Routes/incomeRoutes");

app.use(express.json());
app.use(cors());

//database connection
const url = process.env.DATABASE_URL
mongoose.connect(url)

//Api crreation
app.get("/",(req,res)=>{
    console.log("App is running.....")
    res.send("express app is")
})

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'finance/build')));

//     // Serve the React index.html file for any other route
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname, 'finance/build', 'index.html'));
//     });
// }

//getting user routes
app.use("/api",userRoutes);

//getting expense routes
app.use("/api",expenseRoutes);

//getting budget routes
app.use("/api",budgetRoutes);

//getting income routes
app.use("/api",incomeRoutes);


app.listen(port,(error)=>{
    if(!error){
        console.log("App is listening on port "+ port)
    }else{
        console.log("Error:" +error)
    }
})