import { useContext } from "react";
import "./Home.css"
import { FinanceContext } from "../../context/financeContext";
import { Link } from "react-router-dom";
import ExpenseGraph from "../Expenses/ExpenseGraph";
// import BudgetGraph from "../Budget/BudgetGraph";








const Home = () => {

  const {getTotalIncomeAmount,getTotalExpenseAmount,getTotalBudgetAmount} = useContext(FinanceContext)
  // const options = {
  //   animationEnabled: true,
  //   exportEnabled: true,
  //   theme: "light1", // "light1", "dark1", "dark2"
  //   title:{
  //     text: "Budget"
  //   },
  //   data: [{
  //     type: "pie",
  //     indexLabel: "{label}: {y}%",		
  //     startAngle: -90,
  //     dataPoints: [
  //       { y: 20, label: "Medical" },
  //       { y: 24, label: "Food & Drinks" },
  //       { y: 20, label: "Accomodation" },
  //       { y: 14, label: "Transportation" },
  //       { y: 12, label: "Activities" },
  //       { y: 10, label: "Groceries" }	
  //     ]
  //   }]
 
  // }

  
  return (
    <>
    <div className="home-container">
      <div className="details-container">
        
      <Link to={'/income'} style={{textDecoration:"none", color:"black"}}>  
          <div className="micro-card">
              <h2>Income</h2>
              <h3>RS. {getTotalIncomeAmount()}</h3>
            </div>
      </Link>

      <Link to={'/expense'} style={{textDecoration:"none", color:"black"}}>
        <div className="micro-card">
              <h2>Expenses</h2>
              <h3>RS. {getTotalExpenseAmount()}</h3>
          </div>
      </Link>
        
        <div className="micro-card" style={{textDecoration:"none", color:"black"}}>
            <h2>Savings</h2>
            <h3>RS. {getTotalIncomeAmount()- getTotalExpenseAmount()}</h3>
        </div>

        <Link to={'/budget'} style={{textDecoration:"none", color:"black"}}>
            <div className="micro-card">
                <h2>Budget</h2>
                <h3>RS. {getTotalBudgetAmount()}</h3>
            </div>
        </Link>
        
      </div>
        <ExpenseGraph style={{height:"480px",width:"820px"}}/>
    </div>
      {/* <BudgetGraph style={{height:"660px",width:"380px", margin:"10px"}}/> */}
    </>
  )
}

export default Home
