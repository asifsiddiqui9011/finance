import "./ReportGenerator.css"

// import {CanvasJSChart} from "../Graph"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useContext, useState,useEffect } from "react";
import { FinanceContext } from "../../context/financeContext";
// Create styles
const styles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100vh', // Adjust the height as needed
  },
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    border:"1px solid black",
    fontSize:"20px"
    // flexGrow: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tableCell: {
    // height:"30px",
    width:"130px",
    padding: 5,
    backgroundColor:"white",
    // color:"blue",
    fontSize:"15px",
    border:"1px 0px 1px 0px solid black"
  },
  tableCellHeader: {
    padding: 2,
    backgroundColor: 'white',
    fontWeight: 'bold',
    // color:"blue",
    border:"1px solid black",
    height:"30px",
    width:"130px",
    fontSize:"15px",
    textAlign:"justify"
  },
  text:{
    fontSize:"15px",
    fontWeight:"10px",
    textAlign:"center"
  },
  logo:{
    fontStyle:"italic",
    fontSize:"30px",
    textAlign:"center",
    margin:20
  },
  graph:{
     height:"200px",
     width:"200px"
  }
});

const ReportGenerator = ({reportData}) => {

  const{allExpense,allIncome,allBudget,userData} = useContext(FinanceContext)

  const[passData,setPassData] = useState([])
  console.log(passData,"passsing")

  
  const topic = reportData.topic


  const sortedData = passData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  
  useEffect(()=>{

    if(reportData.topic){
      if(reportData.topic==="Expenses"){
        setPassData(allExpense)
      }else if(reportData.topic==="Income"){
        setPassData(allIncome)
      }else if(reportData.topic==="Budget"){
        setPassData(allBudget)
      }else if(reportData.topic==="Savings"){
        setPassData([])
      }
    }
   },[reportData.topic])


  return (
    <div className="pdf-container">
      <PDFViewer style={styles.viewer}>

        <Document>
          <Page size="A4" style={styles.page}>
            <View>
              <Text style={styles.logo}>Finance Manager</Text>
              <View>
                  <Text>Name: {userData.name}</Text>
                  <Text>Email: {userData.email}</Text>
                  <Text>Phone No: {userData.phone}</Text>
                  <Text>Report Month: {reportData.month}</Text>
                  <Text>Date: {Date()}</Text>
              </View>
              
            </View>
            <View style={styles.section}>
              <Text style={styles.text}>{topic}</Text>
            </View>
          
            <View style={styles.section}>
             
              <View style={styles.tableRow}>
                {["SrNo.","Date", "Tag", "Description", "Amount"].map((headerItem) => (
                  <View key={headerItem} style={styles.tableCellHeader}>
                    <Text>{headerItem}</Text>
                  </View>
                ))}
              </View>
              
             
              {sortedData.map((rowData, index) => (
                <View key={index} style={styles.tableRow}>
                  {[`${index}`,`${rowData.updated_at}`,`${rowData.tag}`,`${rowData.description}`,`${rowData.amount}`,].map((dataItem) => (
                    <View key={dataItem} style={styles.tableCell}>
                      <Text>{dataItem}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
           </Page>
          </Document>    
      </PDFViewer>  
  </div>
  )
}

export default ReportGenerator
