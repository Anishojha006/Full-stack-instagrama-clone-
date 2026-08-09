import React from 'react'
import "../style/form.scss"
const Login = () => {

 const handleSubmit =(e) =>{
     e.preventDefault();
 }
  return (
   <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
             <input type="email" placeholder='Enter email' name='email' />
             <input type="password" placeholder='Enter password' name='password' />
             <button className='button primary-button'>Login</button>
            </form>
        </div>
   </main>
  )
}

export default Login