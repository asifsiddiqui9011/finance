import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import { useContext, useEffect, useState } from 'react';
import { FinanceContext } from '../../context/financeContext';


const ExpenseGraph = (props) => {
    const{allExpense}= useContext(FinanceContext)
    
 
    const sortedData = allExpense.sort((a, b) => new Date(a.expense_date) - new Date(b.expense_date));

  
  
   const dataPoints = [];

  sortedData.map((e)=>{
    if(sortedData){
      let date = `${e.expense_date}`
      let amount = `${e.amount}`
      dataPoints.push({ x: new Date(date), y: Number(amount)});
    }
  
  })

  
  console.log(dataPoints,"datapointss")

  const[type,setType] = useState("bar")

  const handleType = (e)=>{
    setType(e.target.value)
    console.log(type,"type",e.target.value)
  }

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
      type: `${type}`,
       dataPoints:dataPoints
     
    }]
  }
  return (
    
       <div className="budget-graph-container" style={props.style}>
        <select name="type" id="type" value={type} onChange={handleType}>
           <option value="bar">bar</option>
           <option value="spline">spline</option>
        </select>
              <CanvasJSChart options = {expenses} className="chart" id={'chart'}/>
      </div>
  )
}

export default ExpenseGraph
