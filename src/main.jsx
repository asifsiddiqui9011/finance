// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import FinanceContextProvider from './context/financeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <FinanceContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </FinanceContextProvider>
  // </React.StrictMode>,
)
