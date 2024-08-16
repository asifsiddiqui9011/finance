import "./DataEntry.css"
import Graph from "../Graph";
// import {CanvasJSChart} from "../Graph"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useContext } from "react";
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

const DataEntry = (props) => {
  
  const report = `${props.report}`
  console.log(report,"uuuuyyu")
  const{allExpense} = useContext(FinanceContext)
  const sortedData = allExpense.sort((a, b) => new Date(a.expense_date) - new Date(b.expense_date));

  return (
    <div>
      <PDFViewer style={styles.viewer}>
            {/* Start of the document*/}
            <Document>
            <Page size="A4" style={styles.page}>
          <View>
            <Text style={styles.logo}>Finance Manager</Text>
            <View>
               <Text>Name:</Text>
               <Text>Email:</Text>
               <Text>Phone No:</Text>
               <Text>Report Month:</Text>
               <Text>Date: {Date()}</Text>
            </View>
            
          </View>
          <View style={styles.section}>
            <Text style={styles.text}>{report[0]}</Text>
          </View>
          {/* Add the complex table */}
          <View style={styles.section}>
            {/* Header Row 1 */}
            <View style={styles.tableRow}>
              {["SrNo.","Date", "Tag", "Description", "Amount"].map((headerItem) => (
                <View key={headerItem} style={styles.tableCellHeader}>
                  <Text>{headerItem}</Text>
                </View>
              ))}
            </View>
            
            {/* Data Rows */}
            {sortedData.map((rowData, index) => (
              <View key={index} style={styles.tableRow}>
                {[`${index}`,`${rowData.expense_date}`,`${rowData.tag}`,`${rowData.description}`,`${rowData.amount}`,].map((dataItem) => (
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
      <Graph/>  
    </div>
  )
}

export default DataEntry
