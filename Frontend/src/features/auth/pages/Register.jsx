import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Register = () => {
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
 
    async function handleFormsubmit(e){
        e.preventDefault();
      
    }   

    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleFormsubmit}>
                    <input type="text" name='username' placeholder='Enter username' value={username} onChange={(e) => {
                        setusername(e.target.value)
                    }} />
                    <input type="email" name='email' placeholder='Enter email' value={email} onChange={(e) => {
                        setemail(e.target.value);
                    }} />
                    <input type="text" name='password' placeholder='Create password' value={password} onChange={(e) => {
                        setpassword(e.target.value);
                    }} />
                    <button>Register</button>
                </form>
                <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link> </p>
            </div>
        </main>
    )
}

export default Register