
// import { FinanceContext } from "../../context/financeContext";
// import { Link } from "react-router-dom";
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const Graph = () => {

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
    
  return (
    <div>
       {/* <CanvasJSChart options = {options}/> */}
    </div>
  )
}

export default Graph
