import { useState } from "react";
import "./Navbar.css"
import { CgProfile } from "react-icons/cg";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import { RxCrossCircled } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import Profile from "../Profile/Profile";

const Navbar = () => {
  
  const [login,setLogin] = useState(true)
  
  const[loginToggle,setLoginToggle]= useState(false)
  const [profileToggle,setProfileToggle] = useState(false)

  const ProfileToggle = ()=>{
    setProfileToggle(!profileToggle)
  }

  const handleToggle = ()=>{
    setLoginToggle(!loginToggle)
  }

  const handleSwitch = ()=>{
    setLogin(!login)
  }
  return (
    <>
    <div className="navbar-container">
      <h1>Finance Manager</h1>
      <span>Choose Month: 
      <select name="month" id="month">
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
      {localStorage.getItem('auth-token')?<CgProfile onClick={ProfileToggle} id="icon"/>:<button onClick={handleToggle}>Login</button>}
         

    </div>
    {loginToggle &&(<div className="model-container">
      {/* > */}
        <div className="model">
        <RxCross2 onClick={handleToggle} id="icon"/>
        {login == true?<Login signup={handleSwitch} toggle={handleToggle} />:<Signup login={handleSwitch} toggle={handleToggle}/>}
          
      </div>
    </div>

     )}
     {profileToggle 
     &&(
      <div className="model-container" style={{backgroundColor:"transparent"}}>
        <div className="model">
          <RxCross2 onClick={ProfileToggle} id="icon"/>
            <Profile toggle={ProfileToggle}/>
        </div>
      </div>
      
     )}
    </>
    
  )
}

export default Navbar
