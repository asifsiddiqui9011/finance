import { useContext, useState } from "react"
import "./Login.css"
import loginImg from "../../assets/login.jpg"
import { FinanceContext } from "../../context/financeContext"

const Login = (props) => {
  
  const{ url,fetchUser} = useContext(FinanceContext)
  const [userData,setUserData] = useState ({
   
    email:"",
    password:""
  })

  const changeHandler=(e)=>{
    setUserData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const loginn = async () =>{
		let responseData;
		await fetch(`${url}/api/login`,{
			method:'POST',
			headers:{
				Accept:'application/form-data',
				'Content-Type':'application/json',
			},
			body:JSON.stringify(userData),
		}).then((response)=>response.json()).then((data)=>responseData=data)

		if(responseData.success){
			localStorage.setItem('auth-token',responseData.token);
      fetchUser()
      props.toggle()
		}else{
			alert(responseData.errors );
		}
	}


  const login=(event)=>{
    event.preventDefault()
    console.log(userData,"logindetails")
    loginn()
  }

  return (

    <div className="login-container">
     
      <div className="login-img-container">
          <img src={loginImg} alt="" className="login-img" />
      </div>
      <div className="login-form-container">
        <h2>Login  <hr /></h2>
          <form  onSubmit={login} className="login-form">
            <span>
              <p>Email: </p>
              <input type="text" placeholder="enter email" name="email" id="email" value={userData.email} onChange={changeHandler} required />
            </span>
            <span>
              <label >Password: </label>
              <input type="password" placeholder="enter password" name="password" id="password" value={userData.password} onChange={changeHandler} required/>
            </span>
            <span>
              <p>Forgot Password</p>
              <p>Signup</p>
            </span>
            <button type="submit">Login</button>
            <p>Doesn't have an account Click to <b onClick={props.signup}>SignUp</b></p>
          </form>
      </div>
      
    </div>
  )
}

export default Login
