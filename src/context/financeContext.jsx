import { createContext, useEffect } from "react";
import { useState } from "react";



export const FinanceContext = createContext(null);




 
const FinanceContextProvider = (props) => {

    const url = 'https://finance-v28v.onrender.com'
    
    const [allExpense,setAllExpense] = useState([]);
    const [allIncome,setAllIncome] = useState([]);
    const [allBudget,setAllBudget] = useState([]);
    // const [expenseId,setExpenseId] = useState('')
    const [filter,setFilter]= useState({
        month:new Date().toISOString().slice(5,7),
        year:"2024"
    })

    const filterHandler = (e)=>{
  setFilter((prev)=>({...prev,[e.target.name]:e.target.value}))
  console.log(filter,"filtyer")
   }
   
    const [userData,setUserData] = useState('');

    

    //  const getExpense = async ()=>{
      
    //         await fetch('http://localhost:3000/api/allexpense',{
    //             method:"GET",
    //             headers:{
    //                 Accept:'applocation/form-data',
    //                 'auth-token':`${localStorage.getItem('auth-token')}`,
    //                 'Content-Type':'application/json',
    //             },
               
    //         })
    //         .then((response)=>response.json())
    //         .then((data)=>setAllExpense(data));
    //         console.log(allExpense,"all expense")
    //     }

        const getExpense = async ()=>{
      
            await fetch(`${url}/api/expenses?month=${filter.month}&year=${filter.year}`,{
                method:"GET",
                headers:{
                    Accept:'applocation/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json/javascrip',
                },
               
            })
            .then((response)=>response.json())
            .then((data)=>setAllExpense(data));
            console.log(allExpense,"all expense")
        }
     

    //  const getBudget = async ()=>{
    //     if(localStorage.getItem('auth-token')){
    //      await   fetch('http://localhost:3000/api/getbudget',{
    //             method:"GET",
    //             headers:{
    //                 Accept:'applocation/fporm-data',
    //                 'auth-token':`${localStorage.getItem('auth-token')}`,
    //                 'Content-Type':'application/json',
    //             },
              
    //         })
    //         .then((response)=>response.json())
    //         .then((data)=>setAllBudget(data));
    //     }
    //  }
     const getBudget = async ()=>{
        if(localStorage.getItem('auth-token')){
         await   fetch(`${url}/api/budget?month=${filter.month}&year=${filter.year}`,{
                method:"GET",
                headers:{
                    Accept:'applocation/fporm-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json/javascrip',
                },
              
            })
            .then((response)=>response.json())
            .then((data)=>setAllBudget(data));
        }
     }

    //  const getIncome = async ()=>{
    //     if(localStorage.getItem('auth-token')){
    //        await fetch('http://localhost:3000/api/income',{
    //             method:"GET",
    //             headers:{
    //                 Accept:'applocation/form-data',
    //                 'auth-token':`${localStorage.getItem('auth-token')}`,
    //                 'Content-Type':'application/json',
    //             },
             
    //         })
    //         .then((response)=>response.json())
    //         .then((data)=>setAllIncome(data));
    //     }
    //  }
     
     const getIncome = async ()=>{
        if(localStorage.getItem('auth-token')){
           await fetch(`${url}/api/incomes?month=${filter.month}&year=${filter.year}`,{
                method:"GET",
                headers:{
                    Accept:'applocation/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json/javascrip',
                },
             
            })
            .then((response)=>response.json())
            .then((data)=>setAllIncome(data));
        }
     }

     const fetchUser = async ()=>{
        
           
        await   fetch(`${url}/api/getUserDetails`,{
                method:"POST",
                headers:{
                    Accept:'applocation/fporm-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json/javascrip',
                },
                body:JSON.stringify(),
            })
            .then((response)=>response.json())
            .then((data)=>setUserData(data));
        
     }

     let deleteExpense = async (id)=>{
        if(localStorage.getItem('auth-token')){
            await fetch(`${url}/api/expense/${id}`,{
                method:"DELETE",
                headers:{
                    Accept:'applocation/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json/javascrip',
                },
               
            })
            .then((res)=>{res.json()})
            getExpense()
        }
     }

     const deleteIncome = async (id)=>{
        if(localStorage.getItem('auth-token')){
            await fetch(`${url}/api/income/${id}`,{
                method:"DELETE",
                headers:{
                    Accept:'applocation/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json/javascript',
                }, 
            })
            .then((res)=>{res.json()})
            getIncome()
        }
     }

     const deleteBudget = async (id)=>{
        if(localStorage.getItem('auth-token')){
            await fetch(`${url}/api/budget/${id}`,{
                method:"DELETE",
                headers:{
                    Accept:'applocation/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json/javascript',
                },
               
            })
            .then((res)=>{res.json()})
            getBudget()
        }
     }

     useEffect(() => {
      
            fetchUser();
       
    }, []); 
    

    useEffect(()=>{
        
    if(userData?.email){
        getExpense()
        getIncome()
        getBudget()
    }  
    
    },[userData?.email,filter])

    

   

    const getTotalIncomeAmount = () =>  {
        if(allIncome[0]){
            let totalAmount = 0;
            allIncome.map((e)=>{
            let total = `${e.amount}`
            totalAmount += Number(total )
            })
            return totalAmount
        }
      
    } 

    const getTotalExpenseAmount = () =>  {
        let totalAmount = 0;
        if(allIncome[0]){
            allExpense.map((e)=>{
                let total = `${e.amount}`
                totalAmount += Number(total )
                })
                return totalAmount
        }
       
    } 

    const getTotalBudgetAmount = () =>  {
        if(allBudget[0]){
            let totalAmount = 0;
            allBudget.map((e)=>{
            let total = `${e.amount}`
            totalAmount += Number(total )
            })
            return totalAmount
        }
      
    } 

    const[editExpense,setEditExpense] = useState({})
    const[editmodel,setEditModel]=useState(false)
    const editExpenseToggler =()=>{
        setEditModel(!editmodel)
    }
    
    const[editIncome,setEditIncome] = useState({})
    const[incomeodel,setIncomeModel]=useState(false)
    const editIncomeToggler =()=>{
        setIncomeModel(!incomeodel)
    }

    const[editBudget,setEditBudget] = useState({})
    const[budgetModel,setBudgetModel]=useState(false)
    const editBudgetToggler =()=>{
        setBudgetModel(!budgetModel)
    }

   const contextValue = { url,filterHandler,filter, fetchUser,editBudgetToggler,budgetModel,editBudget,setEditBudget,incomeodel,editIncomeToggler,editIncome,setEditIncome,editExpense,setEditExpense,editmodel,editExpenseToggler,userData,allExpense,allIncome,getTotalIncomeAmount,getTotalExpenseAmount, allBudget, getTotalBudgetAmount,deleteExpense,deleteBudget,getExpense,getBudget,getIncome,deleteIncome};
    
    return (
        <FinanceContext.Provider value={contextValue}>
            {props.children}
        </FinanceContext.Provider>
    )
}

export default FinanceContextProvider;