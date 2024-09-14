import { useContext } from "react"
import { FinanceContext } from "../../context/financeContext"
import { RxCross2 } from "react-icons/rx";


const EditIncome = () => {

   const {url,editIncome,setEditIncome,getIncome,editIncomeToggler} = useContext(FinanceContext)
   
    const changeHandler=(e)=>{
        setEditIncome((prev)=>({...prev,[e.target.name]:e.target.value}))
      }

      const updateIncome = async (event)=>{
        event.preventDefault()
        if(editIncome._id){
        await fetch(`${url}/api/income/${editIncome._id}`,{
          method:'PATCH',
          headers:{
            Accept:'application/json',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
          },
          body:JSON.stringify(editIncome),
        }).then((resp)=>resp.json())
          .then((data)=>{
          data.success?alert("Income Updated"):alert("Failed")
        })
        editIncomeToggler()
    }
    getIncome()
       }

      

  return (
    <div className="edit-model-container" >
        <RxCross2 onClick={()=>{editIncomeToggler()}} id="icon"/>
       <div className="income-chart">
            <h2>Update Income</h2>
            <form onSubmit={updateIncome} className="expenses-form">
              <span>
                Select Tag:
                <select name="tag" id="tag" value={editIncome.tag}  onChange={changeHandler}>
                  <option value="salary">Salary</option>
                  <option value="investment">Investment</option>
                  <option value="freelance">Freelance</option>
                  <option value="other">Other</option>
                </select>
              </span>
              <span>Amount: <input type="text" placeholder="Amount?.." name="amount" id="amount" value={editIncome.amount} onChange={changeHandler} required/></span>
              <span>Date: <input type="date" name="income_date" id="income_date" value={editIncome.income_date} onChange={changeHandler} required /> </span>
              
              <button type="submit">Add Income</button>
            </form>
        </div>
    </div>
  )
}

export default EditIncome
