import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">MyBlog</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          {token ? (
            <div className="d-flex align-items-center gap-3">
              <span className="text-white">👋 Welcome, <strong>{name}</strong></span>
              <Link className="btn btn-success" to="/create">+ New Post</Link>
              <button className="btn btn-outline-light" style={{backgroundColor:"  rgba(254, 17, 17, 1)"}} onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link className="btn btn-outline-primary" to="/signin">Sign In</Link>
              <Link className="btn btn-primary" to="/signup">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
