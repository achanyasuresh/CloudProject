import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import './EventList.css';

const EventList = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated
  console.log("tokenauth", isAuthenticated)

  const events = [
    { id: 1, name: 'Hackathon Challenge 1', details: 'Build a full-stack web application within 48 hours.' },
    { id: 2, name: 'Hackathon Challenge 2', details: 'Create an innovative mobile app solution in 24 hours.' },
    { id: 3, name: 'Hackathon Challenge 3', details: 'Develop a machine learning model for data analysis.' },
  ];

  const handleParticipateClick = (eventId) => {
    if (isAuthenticated) {
      // Redirect to the event page if authenticated
      navigate(`/events/${eventId}`);
    } else {
      console.log("User not authenticated, showing toast.");
      toast.error('Please log in to participate.'); 
      alert("Please log in to participate.")// This should show a toast
      navigate('/login');
    }
  };

  return (
    <div className="events-list">
      <h2>Available Events</h2>
      <div className="event-container">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.name}</h3>
            <p>{event.details}</p>
            <button 
              className="event-link"
              onClick={() => handleParticipateClick(event.id)}
            >
              Participate Now
            </button>
          </div>
        ))}
      </div>
      <ToastContainer /> {/* Add the ToastContainer for toast notifications */}
    </div>
  );
};

export default EventList;
