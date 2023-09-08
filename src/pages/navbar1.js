import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import './navbar1.css';

function Navbar1() {
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('authToken');
            console.log('Token:', token);
          // Send a POST request to the server's /api/logout route
          const response = await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`, // Assuming you store the token in local storage
              'Content-Type': 'application/json',
            },
          });
      
          if (response.ok) {
            // Logout was successful on the server side
            // Clear the token from local storage
            localStorage.removeItem('token');
      
            // Redirect the user to the login page or perform any other necessary action
            window.location.href = '/'; // Redirect to the login page
          } else {
            // Handle logout error
            console.error('Logout failed:', response.statusText);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
      <a className="navbar-brand" href="/"><img src="https://upload.wikimedia.org/wikipedia/en/4/47/VNRVJIETLogo.png" alt="Logo" className="logo" /></a>
      <h1>SINTILLASHUNZ</h1>
      <div className="nav-buttons">
        <a href="/" className="nav-button">Home</a>
          <a href="https://www.instagram.com/sintillashunzatvnrvjiet/" className="nav-button">
                <FaInstagram className='insta'/>
          </a>
          <a href="/" className="nav-button">About Us</a>
          <button onClick={handleLogout} className="nav-button">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar1;
