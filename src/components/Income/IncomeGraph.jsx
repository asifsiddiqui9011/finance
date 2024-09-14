import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import { useContext, useState } from 'react';
import { FinanceContext } from '../../context/financeContext';

const IncomeGraph = () => {
    const {allIncome} = useContext(FinanceContext)
    const sortedData = allIncome.sort((a, b) => new Date(a.income_date) - new Date(b.income_date));

    const[type,setType] = useState("spline")

  const handleType = (e)=>{
    setType(e.target.value)
    // console.log(type,"type",e.target.value)
  }

   const dataPoints = [];

   sortedData.map((e)=>{
    let date = `${e.income_date}`
    let amount = `${e.amount}`
    dataPoints.push({ x: new Date(date), y: Number(amount)});
  })




   const points = {
    animationEnabled: true,
    title:{
      text: "Monthly Income - 2024"
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
    <div className="budget-graph-container">
      <select name="type" id="type" value={type} onChange={handleType}>
           <option value="bar">bar</option>
           <option value="spline">spline</option>
        </select>
        <CanvasJSChart options = {points} className="chart" id={'chart'}/>
      </div>
  )
}

export default IncomeGraph
