import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import {useAuth} from "../hooks/useAuth.js"
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [email, setemail] = useState("");
   const [password, setpassword] = useState("");
   const {handleLogin,loading} = useAuth();
   const navigate = useNavigate();

if(loading){
    return <h1>loading ...</h1>
}

async function submitHandler(e){
    e.preventDefault();
    await handleLogin(email,password)
    .then((res)=>{
        console.log(res);
        navigate("/")
    });

   setpassword('');
    setemail('');
  
}

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
                <input type="text" name='email' placeholder='Enter email' autoComplete='email' value={email} onChange={(e)=>{
                    setemail(e.target.value);
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