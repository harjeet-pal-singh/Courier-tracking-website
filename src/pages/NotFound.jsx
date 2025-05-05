import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor:'black',
    textAlign: 'center',
    padding: '100px 20px',
  },
  heading: {
    fontSize: '3rem',
    color: 'white',
  },
  text: {
    fontSize: '1.2rem',
    color: '#555',
    margin: '20px 0',
  },
  link: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default NotFound;
