import React, { useEffect } from 'react';
import Sidebar from '../pages/Sidebar';
import './pages.css'; // Import external CSS
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = () => {
  const navigate = useNavigate(); // Use navigate instead of history

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('User is not logged in');
      navigate('/login'); // Redirect to login using navigate
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/validateToken', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        console.log('User is authenticated');
      }
    } catch (error) {
      console.log('❌ Invalid token, redirecting to login');
      localStorage.removeItem('token');
      navigate('/Login'); // Redirect to login using navigate
    }
  };

  useEffect(() => {
    checkAuth();
  }, []); // Runs on component mount

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome to Admin Dashboard</h1>
        <h2>If you are an admin, you can add and manage couriers.</h2>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard;
