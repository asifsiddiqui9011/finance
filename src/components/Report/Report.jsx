import { useState} from "react"
import "./Report.css"
import ReportGenerator from "../DataEntry/ReportGenerator"
import { RxCross2 } from "react-icons/rx";

const Report = () => {

  const[reportData,setReportData]= useState({

  })

  const changeHandler = (e)=>{
    setReportData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const[toggle,setToggle] = useState(false)

  const Toggle=()=>{
    setToggle(!toggle)
  }

  const print = (event)=>{
    event.preventDefault()
    console.log(reportData,"reportdata")
    Toggle()
  }
  return (
    <div className="report-container">
      <h1>Report</h1>
      <form className="login-form" onSubmit={print}>
        <span>
          Select Month: 
          <select name="month" id="month" value={reportData.month} onChange={changeHandler}>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        </span>
      
        {/* <span>
          <b>From: </b>
          <input type="date" />
        </span>
        <span>
          <b>To: </b>
          <input type="date" />
        </span> */}
        <span>
          <p>Select Topic:  </p>
          <select name="topic" id="topic" value={reportData.topic} onChange={changeHandler}>
            
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
            <option value="Savings">Savings</option>
            <option value="Budget">Budget</option>
          </select>
        </span>
        <span>
           <p>Formate: </p>
           <select name="formate" id="formate" value={reportData.formate} onChange={changeHandler}>
             <option value="PDF">PDF</option>
             <option value="CSV">CSV</option>
           </select>
        </span>
       
        <button type="submit">Generate Report</button>
      </form>
      {/* <Routes>
        <Route
        path='/report/generatereport'
        element={<ReportGenerator reportData={reportData}/>}
        />
      </Routes> */}
      {toggle &&(
        <div className="toggle-container">
          <ReportGenerator reportData={reportData}/>
          <RxCross2 onClick={Toggle} id="icon"/>
        </div>    
      )}
     
    </div>
  )
}

export default Report
