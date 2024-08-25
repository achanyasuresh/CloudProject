import React from 'react'

const Register = () => {
  return (
    <div className="form-container">
    <h2>Register</h2>
    <form>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" placeholder="Enter your username" required />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" placeholder="Enter your email" required />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" placeholder="Enter your password" required />
      <button type="submit">Register</button>
    </form>
  </div>
  )
}

export default Register
