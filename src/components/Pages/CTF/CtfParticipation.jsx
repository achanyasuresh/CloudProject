import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ParticipatePage.css';

const ParticipatePage = () => {
  const { id } = useParams(); // Get the event ID from the URL

  // Static data for the problem description
  const problemDescription = `This is a sample problem for event ${id}. Please solve it and submit your flag.`;

  // State for the user's solution
  const [solution, setSolution] = useState('');

  // Create a downloadable URL for the problem description using a Blob
  const blob = new Blob([problemDescription], { type: 'text/plain' });
  const downloadUrl = URL.createObjectURL(blob);

  return (
    <div className="participation-container">
      <h1>Participate in Event {id}</h1>

      <div className="description-box">
        <h3>Problem</h3>
        <p>{problemDescription}</p>
        <a href={downloadUrl} download={`Problem_${id}.txt`} className="download-button">
          Download Problem
        </a>
      </div>

      <div className="description-box">
        <h3>Solution</h3>
        <textarea
          className="solution-input"
          placeholder="Enter The Flag you got"
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
        ></textarea>
      </div>

      <button className="submit-button">Submit The Flag</button>
    </div>
  );
};

export default ParticipatePage;
