import React, { useState, useEffect } from 'react';
import './AddGroup.css';
import * as Constants from '../../../helpers/constants';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications

const AddGroup = () => {
  const [members, setMembers] = useState([{ name: '', email: '', role: '' }]);
  const [errors, setErrors] = useState([{ name: '', email: '', role: '' }]);
  const [groupName, setGroupName] = useState('official group');
  const [isLoading, setIsLoading] = useState(false);
  const [groupFiles, setGroupFiles] = useState([]);
  const [groupId, setGroupId] = useState(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  useEffect(() => {
    const storedGroupId = localStorage.getItem('groupid');
    if (storedGroupId) {
      try {
        const parsedGroupId = JSON.parse(storedGroupId);
        if (Array.isArray(parsedGroupId) && parsedGroupId.length > 0) {
          setGroupId(parsedGroupId[0]); // Set only the first group ID
          console.log("groupiddd", parsedGroupId[0]); // Log the first group ID
        } else {
          setGroupId(null); // Handle case if parsedGroupId is not an array or is empty
        }
      } catch (error) {
        console.error('Error parsing group ID:', error);
        setGroupId(null);
      }
    }
  }, []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...members];
    updatedMembers[index][name] = value;

    validateField(index, name, value);
    setMembers(updatedMembers);
  };

  const validateField = (index, name, value) => {
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

    const updatedErrors = [...errors];
    updatedErrors[index][name] = error;
    setErrors(updatedErrors);
  };

  const handleAddMember = () => {
    setMembers([...members, { name: '', email: '', role: '' }]);
    setErrors([...errors, { name: '', email: '', role: '' }]);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    const updatedErrors = errors.filter((_, i) => i !== index);
    setMembers(updatedMembers);
    setErrors(updatedErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = members.map((member, index) => {
      return {
        name: !member.name || errors[index].name,
        email: !member.email || errors[index].email,
        role: !member.role || errors[index].role,
      };
    });

    if (validationErrors.some(err => Object.values(err).some(Boolean))) {
      validationErrors.forEach((_, index) => {
        validateField(index, 'name', members[index].name);
        validateField(index, 'email', members[index].email);
        validateField(index, 'role', members[index].role);
      });
      return;
    }

    setIsLoading(true);

    const requestBody = {
      group_name: groupName,
      members,
      group_files: groupFiles,
    };

    const jwt = localStorage.getItem("token");
    console.log('JWT:', jwt);

    if (!jwt || !groupId) {
      console.error('JWT or group ID is missing');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://load-balancer-hackathon-385661405.us-east-1.elb.amazonaws.com/api/v1/group/members?groupId=${groupId}`, {
        method: 'PUT',
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
      console.log('Group updated:', data);
      toast.success('Group members added successfully!');
      // Show success toast

      setMembers([{ name: '', email: '', role: '' }]);
      setErrors([{ name: '', email: '', role: '' }]);
      setGroupFiles([]);
    } catch (error) {
      console.error('Error updating group:', error);
      toast.error('Failed to add group members.'); // Show error toast
    } finally {
      setIsLoading(false);
    }

    console.log('Request Body:', JSON.stringify(requestBody));
  };

  return (
    <div className="add-member-container">
      <ToastContainer /> {/* Add the ToastContainer for toast notifications */}
      <h2>Add Group Members</h2>
      <form onSubmit={handleSubmit}>
        {members.map((member, index) => (
          <div key={index} className="member-form">
            <label htmlFor={`name-${index}`}>Name:</label>
            <input
              type="text"
              id={`name-${index}`}
              name="name"
              value={member.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter member's name"
              required
            />
            {errors[index].name && <span className="error">{errors[index].name}</span>}

            <label htmlFor={`email-${index}`}>Email:</label>
            <input
              type="email"
              id={`email-${index}`}
              name="email"
              value={member.email}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter member's email"
              required
            />
            {errors[index].email && <span className="error">{errors[index].email}</span>}

            <label htmlFor={`role-${index}`}>Role:</label>
            <input
              type="text"
              id={`role-${index}`}
              name="role"
              value={member.role}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter member's role"
              required
            />
            {errors[index].role && <span className="error">{errors[index].role}</span>}

          </div>
        ))}
        {/* <button type="button" onClick={handleAddMember}>Add Another Member</button> */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Add Group Members'}
        </button>
      </form>
    </div>
  );
};

export default AddGroup;
