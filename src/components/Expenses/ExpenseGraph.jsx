import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import { useContext } from 'react';
import { FinanceContext } from '../../context/financeContext';


const ExpenseGraph = (props) => {
    const{allExpense}= useContext(FinanceContext)


  
   const sortedData = allExpense.sort((a, b) => new Date(a.expense_date) - new Date(b.expense_date));
   const dataPoints = [];

  sortedData.map((e)=>{
    let date = `${e.expense_date}`
    let amount = `${e.amount}`
    dataPoints.push({ x: new Date(date), y: Number(amount)});
    console.log(date,amount)
  })

  
  console.log(dataPoints,"datapointss")

   const expenses = {
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
      type: "bar",
       dataPoints:dataPoints
     
    }]
  }
  return (
    
       <div className="budget-graph-container" style={props.style}>
              <CanvasJSChart options = {expenses} className="chart" id={'chart'}/>
      </div>
  )
}

export default ExpenseGraph
