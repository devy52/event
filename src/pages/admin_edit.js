import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin_edit.css';
import Navbar1 from './navbar1';

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventDescription: '',
  });

  useEffect(() => {
    // Fetch events from the backend API
    axios.get('http://localhost:3000/api/events')
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle any error (e.g., display an error message)
      });
  }, []);
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEvent = () => {

    const authToken1 = localStorage.getItem('token');
    console.log("authtoken1",authToken1); // Replace with your actual authentication token
  
  // Configure the request headers to include the token
  if(authToken1){
    const config = {
        headers: {
          'Authorization': `Bearer ${authToken1}`,
        },
      };
    
        // Send a POST request to the backend API to add an event
        axios.post('http://localhost:3000/api/events', formData, config)
          .then((response) => {
            setEvents([...events, response.data]);
            setFormData({
              eventName: '',
              eventDate: '',
              eventDescription: '',
            });
          })
          .catch((error) => {
            console.error(error);
            // Handle any error (e.g., display an error message)
          });
  }
  else{
    console.error("error");
  }
  
  };
  

  const handleUpdateEvent = (eventId) => {
    // Send a PUT request to the backend API to update an event
    // You can implement a separate form or modal for updating events
  };

  const handleDeleteEvent = (eventId) => {
    // Send a DELETE request to the backend API to delete an event
    
  };

  return (
    <div className='outer'>
        <Navbar1/>
    <div className='bod1'>
      <h2>Admin Page</h2>
      <h3>Add Event</h3>
      <input
        type="text"
        placeholder="Event Name"
        name="eventName"
        value={formData.eventName}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="eventDate"
        value={formData.eventDate}
        onChange={handleInputChange}
      />
      <textarea
        placeholder="Event Description"
        name="eventDescription"
        value={formData.eventDescription}
        onChange={handleInputChange}
        className='txtar'
      />
      <button onClick={handleAddEvent}>Add Event</button>
    </div>
    <div className='box2'>
      <h3>Manage Events</h3>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            {event.eventName} - {event.eventDate}
            <button onClick={() => handleUpdateEvent(event._id)}>Edit</button>
            <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default AdminPage;
