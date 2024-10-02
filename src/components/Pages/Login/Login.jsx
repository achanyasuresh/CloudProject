import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import './Login.css';
import { useNavigate } from 'react-router-dom';

import * as Constants from '../../../helpers/constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!email) {
      toast.error('Email is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      toast.error('Enter a valid email address.');
      isValid = false;
    }

    if (!password) {
      toast.error('Password is required.');
      isValid = false;
    } else if (!validatePassword(password)) {
      toast.error('Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      isValid = false;
    }

    if (isValid) {
      // Proceed with login API call
      try {
        const response = await fetch('http://' + Constants.BACKEND_IP + '/api/v1/authenticate/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message);
          // Store the token if needed
          localStorage.setItem('token', data.token);
          navigate("/events")
        } else {
          toast.error(data.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        toast.error('An error occurred while logging in. Please try again later.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <button type="submit">Login</button>
      </form>
      <ToastContainer /> {/* Toast container to display notifications */}
    </div>
  );
};

export default Login;
