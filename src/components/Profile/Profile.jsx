import { useContext } from "react"
import "./Profile.css"
import { FinanceContext } from "../../context/financeContext"

const Profile = (props) => {

  const{userData} = useContext(FinanceContext)
  console.log(userData,"userdata")

  const logout = ()=>{
    localStorage.removeItem('auth-token')
    props.toggle()
  }
  return (
    <div className="profile-container">
      profile
      <img src="" alt="" />
      <h2>{userData.name}</h2>
      <h3>Email:{userData.email}</h3>
      <h3>Phone: {userData.phone}</h3>
      <div>
        <button>Edit</button>
        <button onClick={logout}>SignOut</button>
      </div>
    </div>
  )
}

export default Profile
