import React, { useState } from 'react';
import './AddGroup.css';

const AddGroup = () => {
  const [member, setMember] = useState({ name: '', email: '', role: '' });
  const [errors, setErrors] = useState({ name: '', email: '', role: '' });

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));

    // Validate as user types
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (!nameRegex.test(value)) {
          error = 'Name can only contain alphabets';
        } else {
          error = '';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Enter a valid email address';
        } else {
          error = '';
        }
        break;
      case 'role':
        if (!value.trim()) {
          error = 'Role is required';
        } else {
          error = '';
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const { name, email, role } = member;
    if (!name || !email || !role || errors.name || errors.email || errors.role) {
      validateField('name', name);
      validateField('email', email);
      validateField('role', role);
      return;
    }

    console.log('Member added:', member);
    setMember({ name: '', email: '', role: '' });
    setErrors({ name: '', email: '', role: '' });
  };

  return (
    <div className="add-member-container">
      <h2>Add Group Member</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={member.name}
          onChange={handleChange}
          placeholder="Enter member's name"
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={member.email}
          onChange={handleChange}
          placeholder="Enter member's email"
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          name="role"
          value={member.role}
          onChange={handleChange}
          placeholder="Enter member's role"
          required
        />
        {errors.role && <span className="error">{errors.role}</span>}

        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddGroup;
