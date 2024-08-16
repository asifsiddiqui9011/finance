import { useState } from "react"
import "./Login.css"

const Login = (props) => {

  const [userData,setUserData] = useState ({
   
    email:"",
    password:""
  })

  const changeHandler=(e)=>{
    setUserData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const loginn = async () =>{
		console.log("Login Function Executed",userData)
		let responseData;
		await fetch('http://localhost:3000/api/login',{
			method:'POST',
			headers:{
				Accept:'application/form-data',
				'Content-Type':'application/json',
			},
			body:JSON.stringify(userData),
		}).then((response)=>response.json()).then((data)=>responseData=data)

		if(responseData.success){
			localStorage.setItem('auth-token',responseData.token);
      props.toggle()
      // window.location.replace("/home");
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
          <img src="" alt="" />
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
