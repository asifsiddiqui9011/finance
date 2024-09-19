import { FinanceContext } from "../../context/financeContext"
import "./Expense.css"
import { useContext, useState } from "react"
// import ExpenseGraph from "./ExpenseGraph";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditExpense from "./EditExpense";


const Expense = () => {



  const{getExpense,url,allExpense,deleteExpense,setEditExpense,editmodel,editExpenseToggler}= useContext(FinanceContext)

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
    addexpense()
  }

  const addexpense = async ()=>{
    await fetch(`${url}/api/expense`,{
      method:'POST',
      headers:{
        Accept:'application/json',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(expense),
    }).then((resp)=>resp.json())
      .then((data)=>{
      data.success?alert("Expense Added"):alert("Failed")
      getExpense()
    })
   }
  const sortedData = allExpense.sort((a, b) => new Date(a.expense_date) - new Date(b.expense_date));


  const handleDelete=(e)=>{
        deleteExpense(e)   
  }

 

  const handleEdit = (e)=>{
    setEditExpense(e)
      editExpenseToggler()
      
  }

  return (
    <div className="expense-container">
      {editmodel &&(
        <EditExpense/>
      )}
     
      <div className="expense-chart">
        <h2>Expenses</h2>
        <span className="tags"><p>Tag</p>  <p>Desc</p> <p>Amount</p> <p>Date</p> <p></p>  <p></p></span>
        
         {sortedData.map((e,i)=>{
            return(
              <div className="expense-cards" key={i}>
                <p>Tag {e.tag}</p>
                <p>{e.description}</p>
                <p><b>RS.{e.amount}</b></p>
                <p>{e.expense_date}</p>
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
      {/* <ExpenseGraph/> */}
    </div>
  )
}

export default Expense
