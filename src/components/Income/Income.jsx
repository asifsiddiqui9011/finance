import { FinanceContext } from "../../context/financeContext"
import "./Income.css"
import { useContext, useState } from "react"
import IncomeGraph from "./IncomeGraph";


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

  
var total = getTotalIncomeAmount()

  return (
    <div className="income-cards-container">
    <div className="income-container">
        <span>
          <h1>Income Details</h1>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <h2> Total Income: {total}</h2>
        </span>
        <div className="income-card-container">
           <div className="income-card">
           <p>Salary</p>
            {sortedData.map((e,i)=>{
  
             if(`${e.tag}`=="salary"){
                return(
                  <div key={i} className="data-flow">
                    <p>*</p>
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
                      <p>*</p>
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
                      <p>*</p>
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
                        <p>*</p>
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
     
    </div>
     <IncomeGraph/>
    </div>
  )
}

export default Income
