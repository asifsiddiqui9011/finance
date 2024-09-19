import { FinanceContext } from "../../context/financeContext"
import "./Income.css"
import { useContext, useState } from "react"
// import IncomeGraph from "./IncomeGraph";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditIncome from "./EditIncome";


const Income = () => {

  const {url,allIncome,getTotalIncomeAmount,getIncome,incomeodel,setEditIncome,deleteIncome,editIncomeToggler} = useContext(FinanceContext)

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
    addIncome()
  }

  const addIncome = async ()=>{
    await fetch(`${url}/api/income`,{
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
    getIncome()
   }

   const handleDelete=(e)=>{   
      deleteIncome(e) 
     }

   const handleEdit = (e)=>{
      setEditIncome(e)
      editIncomeToggler()
        
    }
  


   const sortedData = allIncome.sort((a, b) => new Date(a.income_date) - new Date(b.income_date));

  
var total = getTotalIncomeAmount()

  return (
    <div className="income-cards-container">
      {incomeodel &&(
        <EditIncome/>
      )}
       <div className="income-container">
            <span>
              <h1>Income Details</h1>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <h2> Total Income: {total}</h2>
            </span>
            
            <div className="income-card-container">
              <div className="cards-box">
                <div className="income-card">
                    Salary
                      {sortedData.map((e,i)=>{
            
                      if(`${e.tag}`=="salary"){
                          return(
                            <div key={i} className="data-flow-income">
                              <p>*</p>
                              <p>{e.income_date}</p>
                              <p>RS. {e.amount}</p>
                              <div onClick={()=>{handleEdit(e)}}>
                                <MdEdit />
                              </div>
                              <div onClick={()=>{handleDelete(e._id)}}>
                                <MdDelete/>
                              </div>
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
                            <div key={i} className="data-flow-income">
                              <p>*</p>
                              <p>{e.income_date}</p>
                              <p>RS. {e.amount}</p>
                              <div onClick={()=>{handleEdit(e)}}>
                                <MdEdit />
                              </div>
                              <div onClick={()=>{handleDelete(e._id)}}>
                                <MdDelete/>
                              </div>
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
                            <div key={i} className="data-flow-income">
                              <p>*</p>
                              <p>{e.income_date}</p>
                              <p>RS. {e.amount}</p>
                              <div onClick={()=>{handleEdit(e)}}>
                                <MdEdit />
                              </div>
                              <div onClick={()=>{handleDelete(e._id)}}>
                                <MdDelete/>
                              </div>
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
                            <div key={i} className="data-flow-income">
                              <p>*</p>
                              <p>{e.income_date}</p>
                              <p>RS. {e.amount}</p>
                              <div onClick={()=>{handleEdit(e)}}>
                                <MdEdit />
                              </div>
                              <div onClick={()=>{handleDelete(e._id)}}>
                                <MdDelete/>
                              </div>
                            </div>
                          )
                        }
                        
                      })}
                </div>
              </div>
               <div className="income-chart">
            <h2>Add New Income</h2>
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
       {/* <IncomeGraph/> */}
    </div>
  )
}

export default Income
