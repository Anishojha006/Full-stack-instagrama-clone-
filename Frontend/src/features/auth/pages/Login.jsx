import React, { useEffect, useState } from 'react';
import '../style/form.scss';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { loading, handlelogin, user, authError } = useAuth();
  const [email, setemail] = useState('');
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
      const response = await handlelogin(email.trim(), password);
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
          <span className="brand-tag">Welcome back</span>
          <h1>
            Insta<span>gram</span>
          </h1>
          <p>Share moments and reconnect with your community.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-heading">
            <span className="eyebrow">Your community awaits</span>
            <h2>Welcome back</h2>
            <p>Sign in to catch up on the moments you love.</p>
          </div>

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
            autoComplete="current-password"
            required
          />

          {(error || authError) && <p className="form-error" role="alert">{error || authError}</p>}

          <button type="submit" className="button primary-button">
            Sign in
          </button>

          <p className="auth-switcher">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;