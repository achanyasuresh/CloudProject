// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbr';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import AddGroup from './components/Pages/AddGroup/AddGroup';
import EventList from './components/Pages/EventList/EventList';
import EventDetails from './components/Pages/EventDetails/EventDetails';
import Home from './components/Pages/Home/Home';
import GroupMembers from './components/Pages/GroupMembers/GroupMembers';
import CTF from './components/Pages/CTF/ctf';
import CtfParticipation from './components/Pages/CTF/CtfParticipation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-member" element={<AddGroup />} />
          <Route path="/list-member" element={<GroupMembers />} />
          <Route path="/ctf" element={<CTF />} />
          <Route path="/participate/:id" element={<CtfParticipation />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
