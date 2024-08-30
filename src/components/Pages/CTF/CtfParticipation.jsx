import React from 'react';
import { useParams } from 'react-router-dom';
import './ParticipatePage.css'

const ParticipatePage = () => {
  const { id } = useParams();  // Get the event ID from the URL

  return (
    <div className="participation-container">
      <h1>Participate in Event {id}</h1>
      <div className="description-box">
        <h3>Problem 1</h3>
        <textarea className="solution-input" placeholder="Enter your solution for Problem 1 here..."></textarea>
      </div>
      <div className="description-box">
        <h3>Problem 2</h3>
        <textarea className="solution-input" placeholder="Enter your solution for Problem 2 here..."></textarea>
      </div>
      <button className="submit-button">Submit Solutions</button>
    </div>
  );
};

export default ParticipatePage;
