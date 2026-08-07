import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'

const Login = () => {
   const [username, setusername] = useState("");
   const [password, setpassword] = useState("")

async function submitHandler(e){
    e.preventDefault();;
  
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