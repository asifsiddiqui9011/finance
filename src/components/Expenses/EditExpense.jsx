import { useContext, } from "react"
import { FinanceContext } from "../../context/financeContext"
import { RxCross2 } from "react-icons/rx";

const EditExpense = (props) => {

  const url = 'https://finance-v28v.onrender.com'
   const {editExpense,setEditExpense,getExpense,editExpenseToggler} = useContext(FinanceContext)
   
  
  
   const changeHandler=(e)=>{
    setEditExpense((prev)=>({...prev,[e.target.name]:e.target.value}))
    console.log(editExpense.id,"editidd")
  }
  
  const updateExpense = async (event)=>{
    event.preventDefault()
    if(editExpense._id){
    await fetch(`${url}/api/expense/${editExpense._id}`,{
      method:'PATCH',
      headers:{
        Accept:'application/json',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json',
      },
      body:JSON.stringify(editExpense),
    }).then((resp)=>resp.json())
      .then((data)=>{
      data.success?alert("Expense Updated"):alert("Failed")
    })
    editExpenseToggler()
}
getExpense()
   }

  return (
    <div className="edit-model-container">
       <RxCross2 onClick={()=>{editExpenseToggler()}} id="icon"/>
      <div className="edit-card">
      <h2>Update Expense</h2>
        <form  onSubmit={updateExpense} className="expenses-form">
          <span>
            Select Tag:
            <select name="tag" id="tag" value={editExpense.tag} onChange={changeHandler} >
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
          <span>Description: <textarea type="text" placeholder="description" name="description" id="description" value={editExpense.description} onChange={changeHandler} required/></span>
          <span>Amount: <input type="text" placeholder="Amount?.." name="amount" id="amount" value={editExpense.amount} onChange={changeHandler} required/></span>
          <span>Date: <input type="date" name="expense_date" id="expense_date" value={editExpense.expense_date} onChange={changeHandler} required /> </span>
          
          <button type="submit">Update Expense</button>
        </form>
      </div>
    </div>
  )
}

export default EditExpense
