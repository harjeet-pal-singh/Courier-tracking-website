import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './components.css';
import HeroCarousel from './HeroCarousel';
import Footer from './Footer';

const TrackingResult = () => {
  const { trackingId } = useParams();
  const [courierData, setCourierData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetchCourier = async () => {
      try {
        setLoading(true); // Start loading when fetch begins
        const res = await axios.get(`https:singhcourierservice.vercel.app/api/couriers/${trackingId}`);
        setCourierData(res.data);
        setError('');
      } catch (err) {
        console.error("Error fetching courier data:", err);
        setError('Courier not found or invalid Tracking ID');
      } finally {
        setLoading(false); // End loading after fetch
      }
    };

    fetchCourier();
  }, [trackingId]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Add a spinner or text for loading
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return courierData ? (
    <>
      {/* Desktop View - Booking Details */}
      <h2 className='table-h2'>Booking Details</h2>
      <table className="courier-table desktop-view">
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Booking Date</th>
            <th>Booking Center</th>
            <th>To Center</th>
            <th>Status</th>
            <th>Current Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{courierData.trackingId}</td>
            <td>{new Date(courierData.bookingDate).toLocaleDateString()}</td>
            <td>{courierData.sender}</td>
            <td>{courierData.recipient}</td>
            <td>{courierData.status}</td>
            <td>{courierData.address}</td>
          </tr>
        </tbody>
      </table>

      {/* Desktop View - Delivery Details */}
      <h2 className='table-h3'>Delivery Details</h2>
      <table className="courier-table desktop-view">
        <thead>
          <tr>
            <th>Delivery Date</th>
            <th>Delivery Center</th>
            <th>Status</th>
            <th>Current Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{new Date(courierData.deliveryDate).toLocaleDateString()}</td>
            <td>{courierData.deliveryCenter}</td>
            <td>{courierData.status}</td>
            <td>{courierData.address}</td>
          </tr>
        </tbody>
      </table>

      {/* Mobile View - Booking Details */}
      
      <div className="courier-card mobile-view"><h3>Booking Details</h3>
        <p><strong>Tracking ID:</strong> {courierData.trackingId}</p>
        <p><strong>Booking Date:</strong> {new Date(courierData.bookingDate).toLocaleDateString()}</p>
        <p><strong>Booking Center:</strong> {courierData.sender}</p>
        <p><strong>To Center:</strong> {courierData.recipient}</p>
        <p><strong>Status:</strong> {courierData.status}</p>
        <p><strong>Current Location:</strong> {courierData.address}</p>
      </div>

      {/* Mobile View - Delivery Details */}

      <div className="courier-card mobile-view">      <h3>Delivery Details</h3>
        <p><strong>Delivery Date:</strong> {new Date(courierData.deliveryDate).toLocaleDateString()}</p>
        <p><strong>Delivery Center:</strong> {courierData.deliveryCenter}</p>
        <p><strong>Status:</strong> {courierData.status}</p>
        <p><strong>Current Location:</strong> {courierData.address}</p>
      </div>

    </>
  ) : (
    <p>No courier data available.</p> // If data is missing or not found
  );
};

export default TrackingResult;
