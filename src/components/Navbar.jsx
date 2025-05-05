import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './components.css';
import { FaPlane } from 'react-icons/fa';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="title">
        Singh Courier Service <FaPlane size={'15px'} style={{ margin: 'auto' }} />
      </Link>

      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><a href="/#home" onClick={closeMenu}>Home</a></li>
        <li><a href="/#services" onClick={closeMenu}>Services</a></li>
        <li><a href="/track" onClick={closeMenu}>Track</a></li>
        <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
        <li><NavLink to="/Login" className="login-link" onClick={closeMenu}>Login</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
