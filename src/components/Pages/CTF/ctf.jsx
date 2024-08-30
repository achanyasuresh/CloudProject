import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ctf.css";

const CtfList = () => {
  const [ctfEvents, setCtfEvents] = useState([
    { id: 1, name: 'HackTheBox Challenge', description: 'Beginner-level CTF' },
    { id: 2, name: 'Capture the Flag Fest', description: 'Advanced-level CTF' }
  ]);

  const navigate = useNavigate();
  

  const handleParticipateClick = (eventId) => {
    navigate(`/participate/${eventId}`);  // Navigate to participation page with the event ID
  };

  return (
    <div className="ctf-container">
      <h1>CTF Events</h1>
      <ul className="ctf-list">
        {ctfEvents.map(event => (
          <li key={event.id} className="ctf-list-item">
            <div className="ctf-event-details">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
            </div>
            <button 
              className="ctf-participate-button"
              onClick={() => handleParticipateClick(event.id)}  // Pass the event ID to the handler
            >
              Participate Now
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CtfList;
