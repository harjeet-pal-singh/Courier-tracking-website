import React from 'react';
import './components.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Info */}
        <div className="footer-column">
          <h2 className="footer-title">Singh Courier Services</h2>
          <p className="footer-description">
            Fast, secure, and reliable courier delivery across the nation.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-column">
          <h3 className="footer-title">Quick Links</h3>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/track">Track</a>
            <a href="#services">Services</a>
            <a href="/contact">Contact</a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h3 className="footer-title">Contact Us</h3>
          <p className="footer-description">singhcourierservicemks@gmail.com</p>
          <p className="footer-description">+91 92176-64468</p>
        </div>

        {/* Address Info */}
        <div className="footer-column">
          <h3 className="footer-title">Our Address</h3>
          <p className="footer-description">
            Singh Courier service<br />
          Near Bsnl exchange,Railway Road,<br />
            Sri Muktsar Sahib,Punjab, India - 152026
          </p>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="footer-bottom">
        © 2025 Singh Courier Service. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
