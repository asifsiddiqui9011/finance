
import './App.css'
import Budget from './components/Budget/Budget'
import ReportGenerator from './components/DataEntry/ReportGenerator'
import Expense from './components/Expenses/Expense'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Income from './components/Income/Income'
import Navbar from './components/Navbar/Navbar'
import Report from './components/Report/Report'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar/>
      <Sidebar/>

      <div className='display-container'>
       
       <div className='elements-container'>
        <Routes>
          <Route
              path='/'
              element={<Home/>}
            />
            <Route
              path='/income'
              element={<Income/>}
            />
            <Route
              path='/expense'
              element={<Expense/>}
            />
            <Route
              path='/budget'
              element={<Budget/>}
            />
            <Route
              path='/report'
              element={ <Report/>}
            />
            
        </Routes>
       </div>
       
    </div> 
    
      
      <Footer/>
    </>
  )
}

export default App
