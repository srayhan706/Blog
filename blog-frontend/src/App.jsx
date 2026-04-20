import React from 'react';
import { BrowserRouter as Router, Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import PostList from './components/PostList';
import Register from './components/Register';

function App() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="app-shell">
        <div className="app-frame">
          <nav className="topbar">
            <Link to="/" className="brand">
              <div className="brand-mark">B</div>
              <div className="brand-copy">
                <span className="brand-kicker">Editorial Space</span>
                <span className="brand-name">BrightBlog</span>
              </div>
            </Link>

            <div className="nav-actions">
              <div className="nav-links">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  Explore
                </NavLink>
                {token ? (
                  <NavLink
                    to="/create"
                    className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  >
                    Write
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>

              {token && (
                <button type="button" className="button-ghost" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
