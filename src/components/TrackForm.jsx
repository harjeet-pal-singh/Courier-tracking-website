import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './components.css';

const TrackForm = () => {
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTrackingChange = (e) => {
    setTrackingId(e.target.value);
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();

    if (!trackingId.trim()) {
      setError('Tracking ID is required');
      return;
    }

    setError('');
    navigate(`/track/${trackingId}`);
  };

  return (
    <div className="track-form">
      <h2>Track Your Courier</h2>
      <form onSubmit={handleTrackSubmit}>
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={handleTrackingChange}
        />
        <button type="submit">Track</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TrackForm;
