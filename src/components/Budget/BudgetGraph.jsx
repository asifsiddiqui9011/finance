// // import CanvasJSReact from '@canvasjs/react-charts';
// // var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// import { useContext } from 'react';
// import { FinanceContext } from '../../context/financeContext';

// const BudgetGraph = (props) => {
//     const{allBudget,getTotalBudgetAmount} = useContext(FinanceContext)

//     let totalAmount = getTotalBudgetAmount()

//   let budgetwidgets = {Groceries:0,Medical:0,investments:0,Emis:0,fees:0,households:0,Others:0}

//   allBudget.map((e)=>{
//     budgetwidgets[`${e.tag}`]=(Number(`${e.amount}`)/totalAmount)*100
//   })
//   const options = {
//     animationEnabled: true,
//     exportEnabled: true,
//     theme: "light1", // "light1", "dark1", "dark2"
//     title:{
//       text: "Budget"
//     },
//     data: [{
//       type: "doughnut",
//       indexLabel: "{label}: {y}%",		
//       startAngle: -90,
//       dataPoints: [
       
//         { y: budgetwidgets['Emis'], label: "Emis" },
//         { y:budgetwidgets['Others'], label: "Others" },
//         { y: budgetwidgets['fees'], label: "fees" },
//         { y: budgetwidgets['households'], label: "households" },
//         { y: budgetwidgets['Groceries'], label: "Medical" },
//         { y: budgetwidgets['Groceries'], label: "Groceries" },
//         { y: budgetwidgets['investments'], label: "Investment" }

//       ]
//     }]
 
//   }

//   return (
//     <div className="budget-graph-container" style={props.style}>
//             <CanvasJSChart options = {options}/> 
//       </div>
//   )
// }

// export default BudgetGraph

import { useContext } from 'react';
import { FinanceContext } from '../../context/financeContext';
import {Chart as ChartJs} from 'chart.js/auto'
import {Bar,Doughnut,Line} from 'react-chartjs-2'

const BudgetGraph = () => {

    const{allBudget,getTotalBudgetAmount} = useContext(FinanceContext)

      let totalAmount = getTotalBudgetAmount()
    
     let budgetwidgets = {Groceries:0,Medical:0,investments:0,Emis:0,fees:0,households:0,Others:0}
    
  return (
    <div>
      <Bar
        data={{
            labels:["A","B","C"],
            datasets:[
                {
                 label:"Revenue",
                 data:[200,400,600]
                },
                {
                 label:"Cost",
                 data:[100,300,500]
                 },
            ],
        }}
      />
    </div>
  )
}

export default BudgetGraph

