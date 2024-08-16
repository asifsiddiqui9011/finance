import { FinanceContext } from "../../context/financeContext"
import "./Expense.css"
import { useContext, useState } from "react"
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const Expense = () => {

  const{allExpense}= useContext(FinanceContext)

  const [expense,setExpenseData] = useState ({

    tag:"",
    description:"",
    amount:"",
    expense_date:""
  })

  const changeHandler=(e)=>{
    setExpenseData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const addExpense = (event)=>{
    event.preventDefault()
    console.log(expense,"expensedetails")
    addexpense()
  }

  const addexpense = async ()=>{
    await fetch('http://localhost:3000/api/expense',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(expense),
    }).then((resp)=>resp.json())
      .then((data)=>{
      data.success?alert("Address Added"):alert("Failed")
    })
   }


   const dataPoints = [];

  // for (let month = 0; month < 30; month++) {
  //  var number = month
  //   const randomValue = Math.floor(Math.random() * 100000); // Example: random value between 0 and 50000
  //   dataPoints.push({ x: new Date(2017, 0, number), y: randomValue });
  // }

  const sortedData = allExpense.sort((a, b) => new Date(a.expense_date) - new Date(b.expense_date));

  sortedData.map((e,i)=>{
    let date = `${e.expense_date}`
    let amount = `${e.amount}`
    dataPoints.push({ x: new Date(date), y: Number(amount)});
    console.log(date,amount)
  })

  console.log(dataPoints,"datapointss")

   const expenses = {
    animationEnabled: true,
    title:{
      text: "Monthly expense - 2024"
    },
    axisX: {
      valueFormatString: "DD/MM/YYYY"
    },
    axisY: {
      title: "expense (in INR)",
      prefix: "Rs"
    },
    data: [{
      yValueFormatString: "Rs#,###",
      xValueFormatString: "DD/MM/YYYY",
      type: "bar",
       dataPoints:dataPoints
      // dataPoints: [
      //   { x: new Date(2017,0), y: 25060 },
      //   { x: new Date(2017, 1), y: 27980 },
      //   { x: new Date(2017, 2), y: 42800 },
      //   { x: new Date(2017, 3), y: 32400 },
      //   { x: new Date(2017, 4), y: 35260 },
      //   { x: new Date(2017, 5), y: 33900 },
      //   { x: new Date(2017, 6), y: 40000 },
      //   { x: new Date(2017, 7), y: 52500 },
      //   { x: new Date(2017, 8), y: 32300 },
      //   { x: new Date(2017, 9), y: 42000 },
      //   { x: new Date(2017, 10), y: 37160 },
      //   { x: new Date(2017, 11), y: 38400 }
      // ]
     
    }]
  }


  return (
    <div className="expense-container">
      <div className="expense-chart">
        <h2>Expenses</h2>
        <span className="tags"><p>Tag</p>  <p>Desc</p> <p>Amount</p> <p>Date</p> <p></p>  <p></p></span>
        
         {allExpense.map((e,i)=>{
            return(
              <div className="expense-cards" key={i}>
                <p>Tag {e.tag}</p>
                <p>{e.description}</p>
                <p><b>RS.{e.amount}</b></p>
                <p>{e.expense_date}</p>
                <button>Edit</button>
                <button>Remove</button>
              </div>
            )
          })} 
         
      </div>
      <div className="add-expense-container">
        <h2>Add New Expense</h2>
        <form onSubmit={addExpense} className="expenses-form">
          <span>
            Select Tag:
            <select name="tag" id="tag"  onChange={changeHandler}>
              <option value="Groceries">Groceries</option>
              <option value="Medical">Medical</option>
              <option value="Emis">Emis</option>
              <option value="households">households</option>
              <option value="investments">investments</option>
              <option value="fees">fees</option>
              <option value="Others">Others</option>
              <option value="customTag">custom tag</option>
              <option value="noooo"><input type="text" /><input type="text" /></option>
            </select>
          </span>
          <span>Description: <textarea type="text" placeholder="description" name="description" id="description" value={expense.description} onChange={changeHandler} required/></span>
          <span>Amount: <input type="text" placeholder="Amount?.." name="amount" id="amount" value={expense.amount} onChange={changeHandler} required/></span>
          <span>Date: <input type="date" name="expense_date" id="expense_date" value={expense.expense_date} onChange={changeHandler} required /> </span>
          
          <button type="submit">Add Expense</button>
        </form>
      </div>
      <div className="budget-graph-container">
              <CanvasJSChart options = {expenses} className="chart" id={'chart'}/>
      </div>
    </div>
  )
}

export default Expense
