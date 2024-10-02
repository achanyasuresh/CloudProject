import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/ctf">CTF</Link>
        <Link to="/group">Group</Link>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <div className="profile-logout">
            <AccountCircleIcon className="profile-icon" />
            <LogoutIcon className="logout-icon" onClick={handleLogout} />
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
