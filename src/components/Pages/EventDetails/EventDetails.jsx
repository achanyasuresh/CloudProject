import React, { useState, useEffect } from 'react';
import './EventDetails.css';
import { useNavigate } from 'react-router-dom'; 
import Modal from './Modal';
import AddGroup from '../AddGroup/AddGroup';
import GroupMembers from "../GroupMembers/GroupMembers";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const EventDetails = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({ file: '' });

  const groupId = localStorage.getItem('groupid');


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
      setFile(selectedFile);
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
      if (!jwt) {
        console.error('No JWT found in local storage');
        navigate('/login');
        return;
      }

      if (!groupId) {
        console.error('No group ID found.');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('submission', file);

      try {
        const response = await axios.post(
          `http://load-balancer-hackathon-385661405.us-east-1.elb.amazonaws.com/api/v1/group/file/upload?groupId=${groupId}`,
          formDataToSend,
          {
            headers: {
              'X_H_ACCESS_KEY_HEADER': jwt,
            },
          }
        );

        console.log("Response: from file submission", response);
        toast.success('Submission uploaded successfully!'); // Show success toast

        // Reset form data after successful submission
        setFile(null);
        // Navigate after the toast shows
        setTimeout(() => navigate("/"), 3000); // Adjust the time as needed

      } catch (error) {
        console.error('Error submitting file:', error);
        toast.error('Failed to submit the file.'); // Show error toast
      }
    }
  };
  
  const handleAddGroupClick = () => setActiveModal('addGroup');
  const handleViewGroupClick = () => setActiveModal('viewGroup');
  const handleCloseModal = () => setActiveModal(null);

  return (
    <div className="event-details">
      <ToastContainer /> {/* Add the ToastContainer for toast notifications */}
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
        <AddGroup onClose={handleCloseModal} />
      </Modal>
      <Modal isOpen={activeModal === 'viewGroup'} onClose={handleCloseModal}>
        <GroupMembers />
      </Modal>
    </div>
  );
};

export default EventDetails;
