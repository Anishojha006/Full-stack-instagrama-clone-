import React, { useState  } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const { user, loading, handleregister } = useAuth();
    const [email, setemail] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response =   await handleregister(email, password, username);
            console.log("user registered");
            if(response){
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            const msg = err.response && err.response.data && err.response.data.message ? err.response.data.message : err.message;
            alert(msg);
            return 
        }
   
    }
    if (loading) {
        return <h1>loading ...</h1>
    }
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Enter email' name='email' value={email} onChange={(e) => {
                        setemail(e.target.value);
                    }} />
                    <input type="text" placeholder='Enter Username' name='username' value={username}
                        onChange={(e) => {
                            setusername(e.target.value);
                        }} />
                    <input type="password" placeholder='Create an password' name='password' value={password} onChange={(e) => {
                        setpassword(e.target.value);
                    }} />
                    <button className='button primary-button'>Register</button>
                    <p>Already have an account ? <Link to={"/login"}>Login to account.</Link></p>
                </form>
            </div>
        </main>)
}

export default Register