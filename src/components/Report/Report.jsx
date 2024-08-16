import { useState } from "react"
import "./Report.css"
import DataEntry from "../DataEntry/DataEntry"

const Report = () => {

  const[reportData,setReportData]= useState({

  })


  const changeHandler = (e)=>{
    setReportData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const print = (event)=>{
    event.preventDefault()
    console.log(reportData,"reportdata")
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
            <option value="expenses">Expenses</option>
            <option value="savings">Savings</option>
            <option value="budget">Budget</option>
            <option value="all">All</option>
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
      <DataEntry report={reportData}/>
    </div>
  )
}

export default Report
