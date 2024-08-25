import React from 'react';
import './Home.css';

const Home = () => {
  const events = [
    {
      title: 'AI and Machine Learning Hackathon',
      date: 'September 15, 2024',
      location: 'Online',
      description: 'Explore the world of AI and machine learning by solving real-world problems and win amazing prizes!',
    },
    {
      title: 'Blockchain and Fintech Hackathon',
      date: 'October 10, 2024',
      location: 'New York, NY',
      description: 'Dive into blockchain technology and create innovative solutions for the financial industry.',
    },
    {
      title: 'Web Development Sprint',
      date: 'November 5, 2024',
      location: 'San Francisco, CA',
      description: 'Show off your web development skills and compete against other developers to build the best web app.',
    },
  ];

  return (
    <div className="homepage">
      <h1 className="homepage-title">Upcoming Hackathon Events</h1>
      <div className="events-container">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <h2 className="event-title">{event.title}</h2>
            <p className="event-date">📅 {event.date}</p>
            <p className="event-location">📍 {event.location}</p>
            <p className="event-description">{event.description}</p>
            <button className="event-button">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
