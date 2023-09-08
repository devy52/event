import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import './navbar.css';


function Navbar() {
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
        </div>
    </nav>
  );
}

export default Navbar;
