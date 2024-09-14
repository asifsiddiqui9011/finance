import { useContext } from "react"
import "./Profile.css"
import { FinanceContext } from "../../context/financeContext"
import { CgProfile } from "react-icons/cg";

const Profile = (props) => {

  const{userData, fetchUser} = useContext(FinanceContext)
  console.log(userData,"userdata")

  const logout = ()=>{
    localStorage.removeItem('auth-token')
    props.toggle()
    fetchUser()
  }
  return (
    <div className="profile-container">
      <CgProfile id="icon-profile"/>
      <h2>{userData.name}</h2>
      <span><h3>Email:</h3>&nbsp;&nbsp;&nbsp;<p>{userData.email}</p></span>
      <span><h3>Phone:</h3> &nbsp;  &nbsp; <p>{userData.phone}</p></span>
      <div>
        <button>Edit</button>
        <button onClick={logout}>SignOut</button>
      </div>
    </div>
  )
}

export default Profile
