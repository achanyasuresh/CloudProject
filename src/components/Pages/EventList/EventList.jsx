// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
// import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
// import './EventList.css';

// const EventList = () => {
//   const navigate = useNavigate();
//   const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated
//   console.log("tokenauth", isAuthenticated)

//   const events = [
//     { id: 1, name: 'Hackathon Challenge 1', details: 'Build a full-stack web application within 48 hours.' },
//     { id: 2, name: 'Hackathon Challenge 2', details: 'Create an innovative mobile app solution in 24 hours.' },
//     { id: 3, name: 'Hackathon Challenge 3', details: 'Develop a machine learning model for data analysis.' },
//   ];

//   const handleParticipateClick = (eventId) => {
//     if (isAuthenticated) {
//       // Redirect to the event page if authenticated
//       navigate(`/events/${eventId}`);
//     } else {
//       console.log("User not authenticated, showing toast.");
//       toast.error('Please log in to participate.'); 
//       alert("Please log in to participate.")// This should show a toast
//       navigate('/login');
//     }
//   };

//   return (
//     <div className="events-list">
//       <h2>Available Events</h2>
//       <div className="event-container">
//         {events.map((event) => (
//           <div key={event.id} className="event-card">
//             <h3>{event.name}</h3>
//             <p>{event.details}</p>
//             <button 
//               className="event-link"
//               onClick={() => handleParticipateClick(event.id)}
//             >
//               Participate Now
//             </button>
//           </div>
//         ))}
//       </div>
//       <ToastContainer /> {/* Add the ToastContainer for toast notifications */}
//     </div>
//   );
// };

// export default EventList;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]); // State to store fetched events
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for handling errors

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // Check if user is authenticated
  const jwt = localStorage.getItem("token");

  // Fetch events from the API when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://load-balancer-hackathon-385661405.us-east-1.elb.amazonaws.com/api/v1/event/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X_H_ACCESS_KEY_HEADER': jwt,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json(); // Parse the response data

        // Add predefined descriptions for each event
        const eventsWithDescriptions = data.map((event) => {
          let description;
          switch (event.id) {
            case 1:
              description = 'This hackathon focuses on web development. You have 48 hours to build a full-stack web application using any modern frameworks of your choice.';
              break;
            case 2:
              description = 'This challenge is mobile-first! Build an innovative mobile app in just 24 hours. Creativity and functionality will be key to winning.';
              break;
            case 3:
              description = 'Dive into machine learning and data science. This hackathon is all about building a machine learning model that can solve real-world data analysis problems.';
              break;
            default:
              description = 'Join our exciting hackathon! Develop your skills and win amazing prizes!';
          }
          return { ...event, description };
        });

        setEvents(eventsWithDescriptions); // Set the events with descriptions
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading once the request completes
      }
    };

    fetchEvents(); // Trigger the API call
  }, []);

  const handleParticipateClick = (eventId) => {
    if (isAuthenticated) {
      // Redirect to the event page if authenticated
      navigate(`/events/${eventId}`);
    } else {
      // Show toast notification and redirect to login
      toast.error('Please log in to participate.');
      navigate('/login');
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="events-list">
      <h2>Available Events</h2>
      <div className="event-container">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.event_name}</h3>
            <p>{event.details}</p>
            <p><strong>Description: </strong>{event.description}</p> {/* Add the description */}
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

