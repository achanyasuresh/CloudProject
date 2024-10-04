// import React, { useState } from 'react';
// import './EventDetails.css';
// import { useNavigate } from 'react-router-dom'; 
// import Modal from './Modal';
// import AddGroup from '../AddGroup/AddGroup';
// import GroupMembers from "../GroupMembers/GroupMembers";

// const EventDetails = () => {
//   const navigate = useNavigate();
//   const [activeModal, setActiveModal] = useState(null);

//   const [formData, setFormData] = useState({
//     approach: '',
//     tools: '',
//   });
//   const [file, setFile] = useState(null);
//   const [errors, setErrors] = useState({
//     approach: '',
//     tools: '',
//     file: '',
//   });

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     const allowedFileTypes = ['application/pdf', 'application/msword', 'text/plain'];
//     if (selectedFile && !allowedFileTypes.includes(selectedFile.type)) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         file: 'File must be a PDF, Word document, or plain text.',
//       }));
//       setFile(null);
//     } else if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         file: 'File size must be less than 5MB.',
//       }));
//       setFile(null);
//     } else {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         file: '',
//       }));
//       setFile(selectedFile);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));

//     if (name === 'approach' && value.trim() === '') {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         approach: 'Solution approach is required.',
//       }));
//     } else if (name === 'tools' && value.trim() === '') {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         tools: 'Description of tools and technologies is required.',
//       }));
//     } else {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: '',
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.approach.trim()) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         approach: 'Solution approach is required.',
//       }));
//     }
//     if (!formData.tools.trim()) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         tools: 'Description of tools and technologies is required.',
//       }));
//     }
//     if (!file) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         file: 'Please upload a valid solution file.',
//       }));
//     }

//     if (!errors.approach && !errors.tools && !errors.file && file) {
//       alert('File submitted successfully!');
//       setFormData({ approach: '', tools: '' });
//       setFile(null);
//     }
//   };

//   const handleAddGroupClick = () => {
//     setActiveModal('addGroup');
//   };

//   const handleViewGroupClick = () => {
//     setActiveModal('viewGroup');
//   };

//   const handleCloseModal = () => {
//     setActiveModal(null); // Set activeModal to null to close any modal
//   };

//   return (
//     <div className="event-details">
//       <div className="header">
//         <h2>Event Details</h2>
//         <div className="buttons">
//           <button onClick={handleAddGroupClick}>Add Group Members</button>
//           <button onClick={handleViewGroupClick}>View Group Members</button>
//         </div>
//       </div>
//       <p>Please answer the following questions:</p>
//       <form onSubmit={handleSubmit}>
//         <div className="question">
//           <label>Question 1: What is your solution approach?</label>
//           <textarea
//             rows="4"
//             name="approach"
//             value={formData.approach}
//             onChange={handleChange}
//             required
//           />
//           {errors.approach && <span className="error">{errors.approach}</span>}
//         </div>
//         <div className="question">
//           <label>Question 2: Describe the tools and technologies used:</label>
//           <textarea
//             rows="4"
//             name="tools"
//             value={formData.tools}
//             onChange={handleChange}
//             required
//           />
//           {errors.tools && <span className="error">{errors.tools}</span>}
//         </div>
//         <div className="file-upload">
//           <label htmlFor="file">Upload Your Solution File:</label>
//           <input type="file" id="file" onChange={handleFileChange} required />
//           {errors.file && <span className="error">{errors.file}</span>}
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       <Modal isOpen={activeModal === 'addGroup'} onClose={handleCloseModal}>
//         <AddGroup />
//       </Modal>
//       <Modal isOpen={activeModal === 'viewGroup'} onClose={handleCloseModal}>
//         <GroupMembers />
//       </Modal>
//     </div>
//   );
// };

// export default EventDetails;
import React, { useState } from 'react';
import './EventDetails.css';
import { useNavigate } from 'react-router-dom'; 
import Modal from './Modal';
import AddGroup from '../AddGroup/AddGroup';
import GroupMembers from "../GroupMembers/GroupMembers";
import axios from 'axios';
const EventDetails = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  
  const [formData, setFormData] = useState({
    approach: '',
    tools: '',
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({
    approach: '',
    tools: '',
    file: '',
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === 'approach' && value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        approach: 'Solution approach is required.',
      }));
    } else if (name === 'tools' && value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tools: 'Description of tools and technologies is required.',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form data
    if (!formData.approach.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        approach: 'Solution approach is required.',
      }));
    }
    if (!formData.tools.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tools: 'Description of tools and technologies is required.',
      }));
    }
    if (!file) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        file: 'Please upload a valid solution file.',
      }));
    }
  
    // Proceed if there are no errors
    if (!errors.approach && !errors.tools && !errors.file && file) {
      const jwt = localStorage.getItem("token"); // Get the JWT from local storage
      console.log('JWT:', jwt);
      
      if (!jwt) {
        console.error('No JWT found in local storage');
        navigate('/login'); // Redirect to login if no JWT
        return;
      }
      if(jwt){
        console.log("jwt in local", jwt)
      }
  
      const formDataToSend = new FormData();
      formDataToSend.append('approach', formData.approach);
      formDataToSend.append('tools', formData.tools);
      formDataToSend.append('file', file);
  
      try {
          const config = {
            headers: {
              'Authorization': `Bearer ${jwt}`, // Include the JWT in the headers
              'Content-Type': 'multipart/form-data', // Necessary for file uploads
            },
          };
        
          // Log the headers
          console.log('Request Headers:', config.headers);
        
          const response = await axios.post('http://52.207.243.255:8080/api/v1/event', formDataToSend, config);
        console.log('Event submitted:', response);
        alert('Event submitted successfully!');
  
        // Reset the form
        setFormData({ approach: '', tools: '' });
        setFile(null);
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data);
        } else {
          console.error('Error submitting event:', error);
        }
      }
    }
  };
  
  const handleAddGroupClick = () => {
    setActiveModal('addGroup');
  };

  const handleViewGroupClick = () => {
    setActiveModal('viewGroup');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="event-details">
      <div className="header">
        <h2>Event Details</h2>
        <div className="buttons">
          <button onClick={handleAddGroupClick}>Add Group Members</button>
          <button onClick={handleViewGroupClick}>View Group Members</button>
        </div>
      </div>
      <p>Please answer the following questions:</p>
      <form onSubmit={handleSubmit}>
        <div className="question">
          <label>Question 1: What is your solution approach?</label>
          <textarea
            rows="4"
            name="approach"
            value={formData.approach}
            onChange={handleChange}
            required
          />
          {errors.approach && <span className="error">{errors.approach}</span>}
        </div>
        <div className="question">
          <label>Question 2: Describe the tools and technologies used:</label>
          <textarea
            rows="4"
            name="tools"
            value={formData.tools}
            onChange={handleChange}
            required
          />
          {errors.tools && <span className="error">{errors.tools}</span>}
        </div>
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

