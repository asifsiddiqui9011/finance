import { createContext, useEffect } from "react";
import { useState } from "react";
import Expense from "../components/Expenses/Expense";
// import { getAllExpenses } from "../../../server/controller/expenseController";


export const FinanceContext = createContext(null);



// const getDefaultWishList = ()=> {
//     let wishList = {};
//     for (let index = 0; index < 300+1; index++) {
//         wishList[index] = 0;
//     }
//     return wishList;
// }

 
const FinanceContextProvider = (props) => {
    
    const [allExpense,setAllExpense] = useState([]);
    const [allIncome,setAllIncome] = useState([]);
    const [allBudget,setAllBudget] = useState([]);
   
    const [userData,setUserData] = useState('');

    useEffect(()=>{

        // fetch('http://localhost:3000/api/allexpense')
        // .then((response)=>response.json())
        // .then((data)=>setAllExpense(data));

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