import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const { user, loading, handleregister, authError } = useAuth();
  const [email, setemail] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await handleregister(email.trim(), password, username.trim());
      if (response) {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to connect. Check that the backend is running and try again.');
    }
  };

  if (loading) {
    return (
      <main className="auth-page">
        <div className="auth-card loading-card">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="brand-block">
          <span className="brand-tag">Join us</span>
          <h1>
            Insta<span>gram</span>
          </h1>
          <p>Create your profile and start sharing your story.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-heading">
            <span className="eyebrow">A little more you</span>
            <h2>Create your account</h2>
            <p>Make a space for the moments worth sharing.</p>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            autoComplete="username"
            required
            minLength={3}
          />

          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            autoComplete="email"
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            autoComplete="new-password"
            required
            minLength={6}
          />

          {(error || authError) && <p className="form-error" role="alert">{error || authError}</p>}

          <button type="submit" className="button primary-button">
            Create account
          </button>

          <p className="auth-switcher">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;