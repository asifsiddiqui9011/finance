import { FinanceContext } from "../../context/financeContext"
import "./Income.css"
import { useContext, useState } from "react"
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Income = () => {

  const {allIncome,getTotalIncomeAmount} = useContext(FinanceContext)

  const [income,setIncome] = useState ({

    tag:"",
    amount:"",
    income_date:""
  })

  const changeHandler=(e)=>{
    setIncome((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const addincome = (event)=>{
    event.preventDefault()
    console.log(income,"expensedetails")
    addIncome()
  }

  const addIncome = async ()=>{
    await fetch('http://localhost:3000/api/income',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(income),
    }).then((resp)=>resp.json())
      .then((data)=>{
      data.success?alert("Income Added"):alert("Failed")
    })
   }

   const sortedData = allIncome.sort((a, b) => new Date(a.income_date) - new Date(b.income_date));

   console.log(sortedData,"sorted data")

   const dataPoints = [];

   sortedData.map((e)=>{
    let date = `${e.income_date}`
    let amount = `${e.amount}`
    dataPoints.push({ x: new Date(date), y: Number(amount)});
    console.log(date,amount)
  })

  console.log(dataPoints,"datapointss")

   const points = {
    animationEnabled: true,
    title:{
      text: "Monthly Income - 2024"
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
      type: "spline",
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


var total = getTotalIncomeAmount()

  return (
    <div className="income-container">
        <span>
          <h1>Income Details</h1>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <h2> Total Income: {total}</h2>
        </span>
        <div className="income-card-container">
           <div className="income-card">
           <p>Salary</p>
            {allIncome.map((e,i)=>{
  
             if(`${e.tag}`=="salary"){
                return(
                  <div key={i} className="data-flow">
                    <p>{i})</p>
                    <p>{e.income_date}</p>
                    <p>RS. {e.amount}</p>
                  </div>
                )
              }
              
            })}
            

           </div>
           <div className="income-card">
            Investments
            {allIncome.map((e,i)=>{

                if(`${e.tag}`=="investment"){
                  return(
                    <div key={i} className="data-flow">
                      <p>{i})</p>
                      <p>{e.income_date}</p>
                      <p>RS. {e.amount}</p>
                    </div>
                  )
                }
                
              })}
            </div>
           <div className="income-card">
            Freelance
            {allIncome.map((e,i)=>{

                if(`${e.tag}`=="freelance"){
                  return(
                    <div key={i} className="data-flow">
                      <p>{i})</p>
                      <p>{e.income_date}</p>
                      <p>RS. {e.amount}</p>
                    </div>
                  )
                }
                
              })}
            </div>
           <div className="income-card">
            Others
            {allIncome.map((e,i)=>{

                  if(`${e.tag}`=="other"){
                    return(
                      <div key={i} className="data-flow">
                        <p>{i})</p>
                        <p>{e.income_date}</p>
                        <p>RS. {e.amount}</p>
                      </div>
                    )
                  }
                  
                })}
            </div>
        
        <div className="income-chart">
        <h2>Add New Expense</h2>
        <form onSubmit={addincome} className="expenses-form">
          <span>
            Select Tag:
            <select name="tag" id="tag"  onChange={changeHandler}>
              <option value="salary">Salary</option>
              <option value="investment">Investment</option>
              <option value="freelance">Freelance</option>
              <option value="other">Other</option>
            </select>
          </span>
          <span>Amount: <input type="text" placeholder="Amount?.." name="amount" id="amount" value={income.amount} onChange={changeHandler} required/></span>
          <span>Date: <input type="date" name="income_date" id="income_date" value={income.income_date} onChange={changeHandler} required /> </span>
          
          <button type="submit">Add Income</button>
        </form>
      </div>
      </div>
      <div className="budget-graph-container">
              <CanvasJSChart options = {points} className="chart" id={'chart'}/>
      </div>
    </div>
  )
}

export default Income
