// TrackCourier.jsx
import React, { useState } from 'react';
import axios from 'axios';

const TrackCourier = () => {
  const [trackingId, setTrackingId] = useState('');
  const [courier, setCourier] = useState(null);
  const [error, setError] = useState(null);

  const handleTrackCourier = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/couriers/${trackingId}`);
      console.log("Courier Data:", response.data); // Log the response data
      setCourier(response.data);
      setError(null); // Clear previous error
    } catch (err) {
      console.error("Error fetching courier:", err); // Log error details
      setError('Courier not found or error occurred.');
      setCourier(null); // Clear previous data
    }
  };

  return (
    <div className="track-courier">
      <h1>Track Your Courier</h1>
      <input
        type="text"
        placeholder="Enter Tracking ID"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
      />
      <button onClick={handleTrackCourier}>Track</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {courier && (
        <div>
          <h3>Booking  Details:</h3>
          <p><strong>Booking center</strong> {courier.sender}</p>
          <p><strong>To center:</strong> {courier.recipient}</p>
          <p><strong>Status:</strong> {courier.status}</p>
          <p><strong>Current location:</strong> {courier.address}</p>
        </div>
      )}
    </div>
  );
};

export default TrackCourier;
