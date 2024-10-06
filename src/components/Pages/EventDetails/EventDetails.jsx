import React, { useState, useEffect } from 'react';
import './EventDetails.css';
import { useNavigate } from 'react-router-dom'; 
import Modal from './Modal';
import AddGroup from '../AddGroup/AddGroup';
import GroupMembers from "../GroupMembers/GroupMembers";
import axios from 'axios';
import { toast } from 'react-toastify';

const EventDetails = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [groupId, setGroupId] = useState(null);
  
 
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({
    file: '',
  });

  useEffect(() => {
    const storedGroupId = localStorage.getItem('groupid');
    if (storedGroupId) {
      try {
        const parsedGroupId = JSON.parse(storedGroupId);
        if (Array.isArray(parsedGroupId) && parsedGroupId.length > 0) {
          setGroupId(parsedGroupId[0]); // Set only the first group ID
          console.log("groupId:", parsedGroupId[0]); // Log the first group ID
        } else {
          setGroupId(null);
        }
      } catch (error) {
        console.error('Error parsing group ID:', error);
        setGroupId(null);
      }
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedFileTypes = ['application/pdf', 'application/msword', 'text/plain'];
    if (selectedFile && !allowedFileTypes.includes(selectedFile.type)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: 'File must be a PDF, Word document, or plain text.',
      }));
      setFile(null);
    } else if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: 'File size must be less than 5MB.',
      }));
      setFile(null);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: '',
      }));
      setFile(selectedFile); // Properly set the file in state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: 'Please upload a valid solution file.',
      }));
      return;
    }

    if (!errors.file) {
      const jwt = localStorage.getItem("token");
      console.log("JWT token:", jwt);

      if (!jwt) {
        console.error('No JWT found in local storage');
        navigate('/login');
        return;
      }

      if (!groupId) {
        console.error('No group ID found.');
        return;
      }

      // Create FormData object to send with the request
      const formDataToSend = new FormData();
      formDataToSend.append('submission', file); // Append the file with key 'submission'

      try {
        const response = await axios.post(
          `http://load-balancer-hackathon-385661405.us-east-1.elb.amazonaws.com/api/v1/group/file/upload?groupId=${groupId}`,
          formDataToSend,
          {
            headers: {
              'X_H_ACCESS_KEY_HEADER':  jwt, // Use Bearer token for JWT
            },
          }
        );
        navigate("/")
        toast.success('Submission uploaded successfully!');
        console.log("Response:", response);

        // Reset form data after successful submission
        setFile(null);
      } catch (error) {
        console.error('Error submitting file:', error);
        toast.error('Failed to submit the file.');
      }
    }
  };
  
  const handleAddGroupClick = () => setActiveModal('addGroup');
  const handleViewGroupClick = () => setActiveModal('viewGroup');
  const handleCloseModal = () => setActiveModal(null);

  return (
    <div className="event-details">
      <div className="header">
        <h2>Event Details</h2>
        <div className="buttons">
          <button onClick={handleAddGroupClick}>Add Group Members</button>
          <button onClick={handleViewGroupClick}>View Group Members</button>
        </div>
      </div>
      <br />
     
      <form onSubmit={handleSubmit}>
        <div className="file-upload">
          <label htmlFor="file">Upload Your Solution File:</label>
          <input type="file" id="file" onChange={handleFileChange} required />
          {errors.file && <span className="error">{errors.file}</span>}
        </div>
        
        <button type="submit">Submit</button>
      </form>
      
      <Modal isOpen={activeModal === 'addGroup'} onClose={handleCloseModal}>
        <AddGroup />
      </Modal>
      <Modal isOpen={activeModal === 'viewGroup'} onClose={handleCloseModal}>
        <GroupMembers />
      </Modal>
    </div>
  );
};

export default EventDetails;
