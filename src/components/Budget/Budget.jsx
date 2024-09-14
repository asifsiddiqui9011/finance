import { useContext } from "react"
import "./Budget.css"
import { useState } from "react"
import { FinanceContext } from "../../context/financeContext"
import BudgetGraph from "./BudgetGraph";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditBudget from "./EditBudget";


const Budget = () => {


const url = 'https://finance-v28v.onrender.com'
  const{allBudget,deleteBudget,getBudget,budgetModel,editBudgetToggler,setEditBudget} = useContext(FinanceContext)

  const [budget,setbudgetData] = useState ({

    tag:"",
    amount:0,
    month:0,
    year:2024
  })

  const changeHandler=(e)=>{
    setbudgetData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const addbudget = (event)=>{
    event.preventDefault()
    console.log(budget,"budgetdetails")
    addBudget()
  }

  const addBudget = async ()=>{
    await fetch(`${url}/api/budget`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(budget),
    }).then((resp)=>resp.json())
      .then((data)=>{
      data.success?alert("Budget Added"):alert("Failed")
      getBudget()
    })
   }

   const handleDelete=(e)=>{ 
    deleteBudget(e)
}

const handleEdit = (e)=>{
  setEditBudget(e)
  editBudgetToggler()
    
}

budgetModel

  return (
    <div className="budget-container">
      {budgetModel &&(
        <EditBudget/>
      )}
      <div className="budget-display-container">
        <h2>Budget</h2>
        <select name="month" id="month" onChange={changeHandler} >
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
        
        {allBudget.map((e,i)=>{
          return(
                <div key={i} className="data-flow-budget">
                  <p>Tag: {e.tag}</p>
                  <p>Amount: Rs. {e.amount}</p>
                  <div onClick={()=>{handleEdit(e)}}>
                    <MdEdit />
                  </div>
                  <div onClick={()=>handleDelete(e._id)}>
                     <MdDelete/>
                  </div>
                
               </div>
          )
        })}
       

      </div>
      <div className="budget-add-container">
        <h2>Add New budget</h2>
        <form onSubmit={addbudget} className="budgets-form">
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
            </select>
          </span>
          <span>Choose Month: 
          <select name="month" id="month" onChange={changeHandler}>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value={7}>August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
            </select>
      </span>
      <span> year:
      <select name="year" id="year" onChange={changeHandler} >
          <option value={2024}>2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
        </select>
      </span>
      <span>Amount: <input type="text" placeholder="Amount?.." name="amount" id="amount" value={budget.amount} onChange={changeHandler} required/></span>

          {/* <span>From: <input type="date" name="from" id="from" value={budget.from} onChange={changeHandler} required /> </span>
          <span>To: <input type="date" name="to" id="to" value={budget.to} onChange={changeHandler} required /> </span> */}

          <button type="submit">Add budget</button>
        </form>
      </div>
      <BudgetGraph />
    </div>
  )
}

export default Budget
