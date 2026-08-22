import React, { use, useEffect, useState } from 'react';
import "../style/form.scss";
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';


const Login = () => {
  const { handlegetme, loading, handlelogin } = useAuth();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

      const response = await handlelogin(email, password);
      if (response) {
        console.log("user loggedIn");
        navigate("/")
      }

    }
    catch (err) {
      console.error(err);
      const msg = err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message;
      alert(msg);

    }
  }
  if (loading) {
    return <main>
      <h1>Loading data ...</h1>
    </main>
  }
  return (
    <main>
      <div className="form-container">
        <h1>{loading}</h1>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className='button primary-button'>Login</button>
          <p>Don't have an account ? <Link to={"/register"}>Create One.</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Login