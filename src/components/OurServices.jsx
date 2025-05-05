// src/pages/Services.jsx
import React from 'react';
import { FaTruck, FaMapMarkedAlt, FaClock, FaGlobe } from 'react-icons/fa';
import './components.css'; // Make sure this includes your base styles

const services = [
  {
    icon: <FaTruck />,
    title: 'Fast Delivery',
    description: 'Fast delivery',
  },
  {
    icon: <FaMapMarkedAlt />,
    title:'Domestic service',
    description:'We provide domestic service.'
  },
 
  {
    icon: <FaGlobe />,
    title:'International service',
  description:"We provide international service also."  },
];

const Services = () => {
  return (
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>
      <p className="services-subtitle"></p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
