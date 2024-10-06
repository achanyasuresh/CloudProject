import React, { useState } from 'react';
import * as Constants from '../../../helpers/constants';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formValues, setFormValues] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  const [registerMessage, setRegisterMessage] = useState('');
  const navigate = useNavigate()

  // Regular expressions for validation
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Validate as user types
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'username':
        if (!value.trim()) {
          error = 'Username is required';
        }
        break;
      case 'email':
        if (!emailRegex.test(value)) {
          error = 'Enter a valid email address';
        }
        break;
      case 'password':
        if (!strongPasswordRegex.test(value)) {
          error =
            'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @$!%*?&)';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const { username, email, password } = formValues;
    if (!username || !email || !password || errors.username || errors.email || errors.password) {
      validateField('username', username);
      validateField('email', email);
      validateField('password', password);
      return;
    }

    // API Call
    try {
      const response = await fetch('http://load-balancer-hackathon-385661405.us-east-1.elb.amazonaws.com/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: username, email, password }),
      });

      const data = await response.json();
      console.log("response ", data)

      if (response.ok) {
        setRegisterMessage('Registration successful!');
        // Clear form fields
        setFormValues({ username: '', email: '', password: '' });
        setErrors({ username: '', email: '', password: '' });
        localStorage.setItem('groupid',data.group_id);
        navigate("/login")
      } else {
        setRegisterMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setRegisterMessage('An error occurred while registering. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
        {errors.username && <span className="error">{errors.username}</span>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <button type="submit">Register</button>
      </form>
      {registerMessage && <div className="register-message">{registerMessage}</div>}
    </div>
  );
};

export default Register;
