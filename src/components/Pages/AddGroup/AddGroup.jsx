import React, { useState } from 'react';
import './AddGroup.css';

const AddGroup = () => {
  const [member, setMember] = useState({ name: '', email: '', role: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Member added:', member);
    setMember({ name: '', email: '', role: '' });
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
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
};

export default AddGroup;
