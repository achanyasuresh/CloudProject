import React, { useState } from 'react';
import './EventDetails.css';

const EventDetails = () => {
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
    // Check if the file type is allowed and the size is within the limit (e.g., 5MB)
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

    // Validate fields as the user types
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check before submission
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

    // If no errors, process the form
    if (!errors.approach && !errors.tools && !errors.file && file) {
      alert('File submitted successfully!');
      // Submit logic can go here, e.g., sending the data to a backend server
      setFormData({ approach: '', tools: '' });
      setFile(null);
    }
  };

  return (
    <div className="event-details">
      <h2>Event Details</h2>
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
    </div>
  );
};

export default EventDetails;
