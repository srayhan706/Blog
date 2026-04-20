import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await api.post('/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      localStorage.setItem('token', response.data.token);
      alert('Login successful!');
      window.location.href = '/';
    } catch {
      alert('Invalid credentials!');
    }
  };

  return (
    <section className="auth-layout">
      <aside className="auth-aside">
        <div>
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}>
            Welcome back
          </span>
          <h2>Step into your writing desk.</h2>
          <p>
            Sign in to publish new posts, vote on great ideas, and manage your space with a more
            refined editorial UI.
          </p>
        </div>

        <ul>
          <li>Access the full post feed and community voting.</li>
          <li>Create polished posts from a cleaner composer experience.</li>
          <li>Move between reading and publishing without the old visual clutter.</li>
        </ul>
      </aside>

      <div className="form-panel">
        <div className="form-copy">
          <span className="eyebrow">Login</span>
          <h2>Sign in to your account</h2>
          <p>
            Use the same credentials you registered with. New here?{' '}
            <Link to="/register">Create an account</Link>.
          </p>
        </div>

        <form className="form-grid" onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
