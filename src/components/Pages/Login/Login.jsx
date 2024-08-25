import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className="form-container">
    <h2>Login</h2>
    <form>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" placeholder="Enter your email" required />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" placeholder="Enter your password" required />
      <button type="submit">Login</button>
    </form>
  </div>
  )
}

export default Login
