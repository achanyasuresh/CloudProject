import React, { useState } from 'react';
import './EventDetails.css';

const EventDetails = () => {
  const [file, setFile] = useState(null);

  console.log("file", file)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('File submitted successfully!');
  };

  return (
    <div className="event-details">
      <h2>Event Details</h2>
      <p>Please answer the following questions:</p>
      <form onSubmit={handleSubmit}>
        <div className="question">
          <label>Question 1: What is your solution approach?</label>
          <textarea rows="4" required></textarea>
        </div>
        <div className="question">
          <label>Question 2: Describe the tools and technologies used:</label>
          <textarea rows="4" required></textarea>
        </div>
        <div className="file-upload">
          <label htmlFor="file">Upload Your Solution File:</label>
          <input type="file" id="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EventDetails;
