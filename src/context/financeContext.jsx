import { createContext, useEffect } from "react";
import { useState } from "react";


export const FinanceContext = createContext(null);




 
const FinanceContextProvider = (props) => {
    
    const [allExpense,setAllExpense] = useState([]);
    const [allIncome,setAllIncome] = useState([]);
    const [allBudget,setAllBudget] = useState([]);
   
    const [userData,setUserData] = useState('');

    useEffect(()=>{

    

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:3000/api/allexpense',{
                method:"GET",
                headers:{
                    Accept:'applocation/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                // body:JSON.stringify(),
            })
            .then((response)=>response.json())
            .then((data)=>setAllExpense(data));
            console.log(allExpense,"all expense")
        }

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:3000/api/income',{
                method:"GET",
                headers:{
                    Accept:'applocation/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                // body:'',
            })
            .then((response)=>response.json())
            .then((data)=>setAllIncome(data));
        }

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:3000/api/getbudget',{
                method:"GET",
                headers:{
                    Accept:'applocation/fporm-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                // body:JSON.stringify(),
            })
            .then((response)=>response.json())
            .then((data)=>setAllBudget(data));
        }

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:3000/api/getUserDetails',{
                method:"POST",
                headers:{
                    Accept:'applocation/fporm-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(),
            })
            .then((response)=>response.json())
            .then((data)=>setUserData(data));
        }
    },[])



   

    const getTotalIncomeAmount = () =>  {
        let totalAmount = 0;
       allIncome.map((e)=>{
       let total = `${e.amount}`
       totalAmount += Number(total )
       })
       return totalAmount
    } 

    const getTotalExpenseAmount = () =>  {
        let totalAmount = 0;
       allExpense.map((e)=>{
       let total = `${e.amount}`
       totalAmount += Number(total )
       })
       return totalAmount
    } 

    const getTotalBudgetAmount = () =>  {
        let totalAmount = 0;
       allBudget.map((e)=>{
       let total = `${e.amount}`
       totalAmount += Number(total )
       })
       return totalAmount
    } 





   const contextValue = {userData,allExpense,allIncome,getTotalIncomeAmount,getTotalExpenseAmount, allBudget, getTotalBudgetAmount};
    
    return (
        <FinanceContext.Provider value={contextValue}>
            {props.children}
        </FinanceContext.Provider>
    )
}

export default FinanceContextProvider;