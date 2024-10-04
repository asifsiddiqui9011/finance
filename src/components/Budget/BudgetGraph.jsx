

import { useContext } from 'react';
import { FinanceContext } from '../../context/financeContext';
import {Chart as ChartJs} from 'chart.js/auto'
import {Bar,Doughnut,Line} from 'react-chartjs-2'

const BudgetGraph = (props) => {

    const{allBudget,getTotalBudgetAmount} = useContext(FinanceContext)

      let totalAmount = getTotalBudgetAmount()
    
    
    
  return (
    <div className="budget-graph-container" style={props.style}>
      <Bar
        data={{
            labels:allBudget.map((data)=>`${data.tag}`),
            datasets:[
                {
                 label:"Budget",
                 data:allBudget.map((data)=>data.amount),
                 },
            ],
        }}
      />
    </div>
  )
}

export default BudgetGraph

