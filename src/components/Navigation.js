// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/Navigation.css'; // Make sure to create a Navbar.css file for styling

const Navigation = () => {
  return (
    <div className="navbar">
      <h1>Semantic-Dict</h1>
      <NavLink to="/search" className="nav-item">Search</NavLink>
      <NavLink to="/image" className="nav-item">Image Search</NavLink>
      <NavLink to="/wordlist" className="nav-item">WordList</NavLink>
      <NavLink to="/home" className="nav-item">Account</NavLink>
      {/* <NavLink to="/charts" className="nav-item">Charts</NavLink>
      <NavLink to="/documents" className="nav-item">Documents</NavLink> */}
    </div>
  );
};

export default Navigation;
