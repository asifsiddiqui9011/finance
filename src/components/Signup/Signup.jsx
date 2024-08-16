import { useState } from "react"

const Signup = (props) => {

  const [signupData,setSignupData] = useState ({
    
    name:"",
    email:"",
    phone:"",
    password:""

  })

  const changeHandler=(e)=>{
    setSignupData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const sign=(event)=>{
    event.preventDefault()
    console.log(signupData,"logindetails")
    signup()
  }


  const signup = async () =>{
		// console.log("signup Function Executed",signupData);\
    try {
      let responseData;
		await fetch('http://localhost:3000/api/users',{
			method:'POST',
			headers:{
				Accept:'application/form-data',
				'Content-Type':'application/json',
			},
			body:JSON.stringify(signupData),
		}).then((response)=>response.json()).then((data)=>responseData=data)
     console.log(responseData.success,"success")
		if(responseData.success){
			localStorage.setItem('auth-token',responseData.token);
			props.toggle()
    }
    } catch (error) {
      console.log(error,"error")
      alert(error)
    }
		
		// }else{
		// 	alert(responseData.errors );
		// }
	}

  
  return (
    <div className="login-container">
     
      <div className="login-img-container">
          <img src="" alt="" />
      </div>
      <div className="login-form-container">
        <h2>SignUp<hr /></h2>
          <form  onSubmit={sign} className="login-form">
          <span>
              <p>FullName: </p>
              <input type="text" placeholder="enter email" name="name" id="name" value={signupData.name} onChange={changeHandler} required />
            </span>
            <span>
              <p>Email: </p>
              <input type="text" placeholder="enter email" name="email" id="email" value={signupData.email} onChange={changeHandler} required />
            </span>
            <span>
              <p>Mobile: </p>
              <input type="text" placeholder="enter email" name="phone" id="phone" value={signupData.phone} onChange={changeHandler} required />
            </span>
            <span>
              <label >Password: </label>
              <input type="password" placeholder="enter password" name="password" id="password" value={signupData.password} onChange={changeHandler} required/>
            </span>
            <button type="submit">Signup</button>
            <p>Already! have an account Click to <b onClick={props.login}>Login</b></p>
          </form>
      </div>
      
    </div>
  )
}

export default Signup
