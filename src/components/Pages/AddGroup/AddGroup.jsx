import React, { useState } from 'react';
import './AddGroup.css';

const AddGroup = () => {
  const [member, setMember] = useState({ name: '', email: '', role: '' });
  const [errors, setErrors] = useState({ name: '', email: '', role: '' });
  const [groupName, setGroupName] = useState('official group'); // Example group name
  const [isLoading, setIsLoading] = useState(false);

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
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Enter a valid email address';
        }
        break;
      case 'role':
        if (!value.trim()) {
          error = 'Role is required';
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate all fields before submitting
  //   const { name, email, role } = member;
  //   if (!name || !email || !role || errors.name || errors.email || errors.role) {
  //     validateField('name', name);
  //     validateField('email', email);
  //     validateField('role', role);
  //     return;
  //   }

  //   setIsLoading(true);

  //   const newMember = {
  //     user_name: name,
  //     user_id: email, // Assuming email is used as user_id; adjust as needed
  //   };

  //   const requestBody = {
  //     group_name: groupName,
  //     members: [newMember],
  //     group_files: [], // Add any files if needed
  //   };
  //   const jwt  = localStorage.getItem("token")
  //   console.log('JWT:', jwt);
  //   try {
  //     const response = await fetch('http://52.207.243.255:8080/api/v1/group', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${jwt}`, 
  //       },
  //       body: JSON.stringify(requestBody),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const data = await response.json();
  //     console.log('Group added:', data);

  //     // Reset form and errors
  //     setMember({ name: '', email: '', role: '' });
  //     setErrors({ name: '', email: '', role: '' });
  //   } catch (error) {
  //     console.error('Error adding group:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }

  //   console.log('Request Body:', JSON.stringify(requestBody));
  //   console.log('Request Headers:', {
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${jwt}`,
  // });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, role } = member;

    // Validate inputs before proceeding
    if (!name || !email || !role || errors.name || errors.email || errors.role) {
        validateField('name', name);
        validateField('email', email);
        validateField('role', role);
        return;
    }

    setIsLoading(true);

    const newMember = {
        user_name: name,
        user_id: email,
    };

    const requestBody = {
        group_name: groupName,
        members: [newMember],
        group_files: [],
    };

    const jwt = localStorage.getItem("token");
    console.log('JWT:', jwt);

    if (!jwt) {
        console.error('JWT is missing');
        setIsLoading(false);
        return; // Exit if the token is not available
    }

    try {
        const response = await fetch('http://52.207.243.255:8080/api/v1/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X_H_ACCESS_KEY_HEADER': jwt,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Group added:', data);

        // Reset form and errors
        setMember({ name: '', email: '', role: '' });
        setErrors({ name: '', email: '', role: '' });
    } catch (error) {
        console.error('Error adding group:', error);
    } finally {
        setIsLoading(false);
    }

    console.log('Request Body:', JSON.stringify(requestBody));
    console.log('Request Headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
    });
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

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
};

export default AddGroup;
