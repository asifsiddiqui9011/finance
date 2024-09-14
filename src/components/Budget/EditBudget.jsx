import { useContext } from "react"
import { FinanceContext } from "../../context/financeContext"
import { RxCross2 } from "react-icons/rx";

const EditBudget = () => {

    const url = 'https://finance-v28v.onrender.com'

    const {editBudgetToggler,editBudget,setEditBudget,getBudget} = useContext(FinanceContext)
    const changeHandler=(e)=>{
        setEditBudget((prev)=>({...prev,[e.target.name]:e.target.value}))
      }

      const updateBudget = async (event)=>{
        event.preventDefault()
        if(editBudget._id){
        await fetch(`${url}/api/budget/${editBudget._id}`,{
          method:'PATCH',
          headers:{
            Accept:'application/json',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
          },
          body:JSON.stringify(editBudget),
        }).then((resp)=>resp.json())
          .then((data)=>{
          data.success?alert("Budget Updated"):alert("Failed")
        })
        editBudgetToggler()
    }
    getBudget()
       }

  return (
    <div className="edit-model-container">
     <RxCross2 onClick={()=>{editBudgetToggler()}} id="icon"/>
     <div className="budget-add-container">
        <h2>Add New budget</h2>
        <form onSubmit={updateBudget} className="budgets-form">
          <span>
            Select Tag:
            <select name="tag" id="tag" value={editBudget.tag} onChange={changeHandler}>
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
          <select name="month" id="month" value={editBudget.month} onChange={changeHandler}>
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
      <select name="year" id="year" value={editBudget.year} onChange={changeHandler} >
          <option value={2024}>2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
        </select>
      </span>
      <span>Amount: <input type="text" placeholder="Amount?.." name="amount" id="amount" value={editBudget.amount} onChange={changeHandler} required/></span>

          {/* <span>From: <input type="date" name="from" id="from" value={budget.from} onChange={changeHandler} required /> </span>
          <span>To: <input type="date" name="to" id="to" value={budget.to} onChange={changeHandler} required /> </span> */}

          <button type="submit">Add budget</button>
        </form>
        </div>
    </div>
  )
}

export default EditBudget
