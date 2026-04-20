import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post('/users/', { email, password });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert(`Error registering: ${error.response?.data?.detail || 'Unknown error'}`);
    }
  };

  return (
    <section className="auth-layout">
      <aside className="auth-aside">
        <div>
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}>
            Start publishing
          </span>
          <h2>Create your author account.</h2>
          <p>
            Join the platform to write, publish, and shape a blog feed that feels modern instead
            of purely functional.
          </p>
        </div>

        <ul>
          <li>Set up your account in one quick step.</li>
          <li>Jump straight into a cleaner writing workflow.</li>
          <li>Vote and manage posts from the same polished dashboard.</li>
        </ul>
      </aside>

      <div className="form-panel">
        <div className="form-copy">
          <span className="eyebrow">Register</span>
          <h2>Open your space</h2>
          <p>
            Already have an account? <Link to="/login">Sign in instead</Link>.
          </p>
        </div>

        <form className="form-grid" onSubmit={handleRegister}>
          <div className="field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="Choose a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button">
            Create account
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
