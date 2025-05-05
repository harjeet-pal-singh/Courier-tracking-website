
import React from 'react';
import './components.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p className="contact-description">We're here to help. Reach out to us through any of the channels below.</p>

      <div className="contact-cards">
        <div className="contact-card">
          <FaMapMarkerAlt className="icon" />
          <h3>Address</h3>
          <p>Railway road,near bsnl exchange, sri muktsar sahib</p>
        </div>

        <div className="contact-card">
          <FaPhoneAlt className="icon" />
          <h3>Phone</h3>
          <p>+91 9217664468</p>
        </div>

        <div className="contact-card">
          <FaEnvelope className="icon" />
          <h3>Email</h3>
          <p>singhcourierservicemks@gmail.com</p>
        </div>
      </div>

      <div className="social-links">
        <a href="#"><FaFacebook /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaInstagram /></a>
      </div>
    </div>
  );
};

export default Contact;
