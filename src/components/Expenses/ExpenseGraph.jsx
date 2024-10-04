
import { useContext, useState } from 'react';
import { FinanceContext } from '../../context/financeContext';
import {Chart as ChartJs} from 'chart.js/auto'
import {Bar,Doughnut,Line} from 'react-chartjs-2'


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
        <Bar
        data={{
            labels:allExpense.map((data)=>`${data.expense_date}`),
            datasets:[
                {
                 label:"Budget",
                 data:allExpense.map((data)=>data.amount),
                 },
            ],
        }}
      />      
      </div>
  )
}

export default ExpenseGraph
