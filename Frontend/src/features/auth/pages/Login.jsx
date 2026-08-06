import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import axios from 'axios';
const Login = () => {
   const [username, setusername] = useState("");
   const [password, setpassword] = useState("")

async function submitHandler(e){
    e.preventDefault();;
   await axios.post(" http://localhost:3000/api/auth/login",{
        username,password
    },{
        withCredentials:true
    }).then((res)=>{
        console.log(res.data);
    })
    setpassword("");
    setusername("");
}

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input type="text" name='username' placeholder='Enter Username' autoComplete='usename' value={username} onChange={(e)=>{
                    setusername(e.target.value);
                }}/>

                <input type='password' name='password' placeholder='Enter password' autoComplete='current-password' value={password} onChange={(e)=>{
                    setpassword(e.target.value);
                }}/>

                <button>Login</button>
            </form>

            <p>Don't have an account? <Link  className='toggleAuthForm' to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login