import { useContext } from "react";
import "./Home.css"
import CanvasJSReact from '@canvasjs/react-charts';
import { FinanceContext } from "../../context/financeContext";
import { Link } from "react-router-dom";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;







const Home = () => {

  const {getTotalIncomeAmount,getTotalExpenseAmount,getTotalBudgetAmount} = useContext(FinanceContext)
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    title:{
      text: "Budget"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",		
      startAngle: -90,
      dataPoints: [
        { y: 20, label: "Medical" },
        { y: 24, label: "Food & Drinks" },
        { y: 20, label: "Accomodation" },
        { y: 14, label: "Transportation" },
        { y: 12, label: "Activities" },
        { y: 10, label: "Groceries" }	
      ]
    }]
 
  }

  const dataPoints = [];

  for (let month = 0; month < 30; month++) {
   var number = month
    const randomValue = Math.floor(Math.random() * 100000); // Example: random value between 0 and 50000
    dataPoints.push({ x: new Date(2017, 0, number), y: randomValue });
  }

  console.log(dataPoints)

  

  const expense = {
    animationEnabled: true,
    title:{
      text: "Monthly expense - 2024"
    },
    axisX: {
      valueFormatString: "DD/MM/YYYY"
    },
    axisY: {
      title: "expense (in INR)",
      prefix: "Rs"
    },
    data: [{
      yValueFormatString: "Rs#,###",
      xValueFormatString: "DD/MM/YYYY",
      type: "spline",
      dataPoints:dataPoints
      // dataPoints: [
      //   { x: new Date(2017,0), y: 25060 },
      //   { x: new Date(2017, 1), y: 27980 },
      //   { x: new Date(2017, 2), y: 42800 },
      //   { x: new Date(2017, 3), y: 32400 },
      //   { x: new Date(2017, 4), y: 35260 },
      //   { x: new Date(2017, 5), y: 33900 },
      //   { x: new Date(2017, 6), y: 40000 },
      //   { x: new Date(2017, 7), y: 52500 },
      //   { x: new Date(2017, 8), y: 32300 },
      //   { x: new Date(2017, 9), y: 42000 },
      //   { x: new Date(2017, 10), y: 37160 },
      //   { x: new Date(2017, 11), y: 38400 }
      // ]
     
    }]
  }
  
  return (
    <>
    <div className="home-container">
      <div className="details-container">
        
      <Link to={'/income'}>  
          <div className="micro-card">
              <h2>Income</h2>
              <h3>RS. {getTotalIncomeAmount()}</h3>
            </div>
      </Link>

      <Link to={'/expense'}>
        <div className="micro-card">
              <h2>Expenses</h2>
              <h3>RS. {getTotalExpenseAmount()}</h3>
          </div>
      </Link>
        
        <div className="micro-card">
            <h2>Savings</h2>
            <h3>RS. 989898</h3>
        </div>

        <Link to={'/budget'}>
            <div className="micro-card">
                <h2>Budget</h2>
                <h3>RS. {getTotalBudgetAmount()}</h3>
            </div>
        </Link>
        
      </div>
      <div className="graphs-container">
          <CanvasJSChart options = {expense} className="chart" id={'chart'}/>
      </div>
    </div>
    <div className="budget-container">
      <div className="budget-graph">
        <CanvasJSChart options = {options}/>
      </div>
    </div>
    </>
  )
}

export default Home
