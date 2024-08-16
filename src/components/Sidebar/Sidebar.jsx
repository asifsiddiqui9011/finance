import "./Sidebar.css"
import { Link } from "react-router-dom"
import { AiFillHome } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { BsGraphUp } from "react-icons/bs";


const Sidebar = () => {
  return (
    <div className="sidebar-container">
       
    <Link to={"/"}> 
         <div className="icons">
            <AiFillHome />
         </div>
     </Link>
    
     <Link to={"income"}>
         <div className="icons">
         <GiWallet />
         </div>
     </Link>
     <Link to={"expense"}>
         <div className="icons">
         <GiTakeMyMoney />
         </div>
     </Link>
     
     <Link to={"budget"}>
         <div className="icons">
         <BsGraphUp />
         </div >
     </Link>
     
     <Link to={"report"}>
         <div className="icons">
         <BsFileEarmarkBarGraphFill />
         </div>
     </Link>
     
    

   
 </div>
  )
}

export default Sidebar
