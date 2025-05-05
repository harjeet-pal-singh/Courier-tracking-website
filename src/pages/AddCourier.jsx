import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";
import Sidebar from './Sidebar';

const AddCourierForm = () => {
  const [formData, setFormData] = useState({
    trackingId: '',
    bookingDate: '', // Added bookingDate
    sender: '',
    recipient: '',
    status: '',
    address: '',
    deliveryDate: '', // New field for delivery date
    deliveryCenter: '', // New field for delivery center
    deliveryStatus: '', // New field for delivery status
    currentLocation: '' // New field for current location
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert("❌ No token found, please login again.");
      return;
    }
    try {
      const response = await axios.post('https://courier-tracking-website-t92q.onrender.com/api/couriers', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        setSuccessMessage('✅ Courier added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);

        // Reset the form data after successful submission
        setFormData({
          trackingId: '',
          bookingDate: '',
          sender: '',
          recipient: '',
          status: '',
          address: '',
          deliveryDate: '', // Reset new fields
          deliveryCenter: '',
          deliveryStatus: '',
          currentLocation: ''
        });
      } else {
        alert('❌ Something went wrong!');
      }
    } catch (error) {
      if (error.response){
        alert(`❌ Error: ${error.response.data.message || 'Failed to add courier'}`);
      } else if (error.request) {
        alert('❌ No response from the server');
      } else {
        alert('❌ Failed to add courier');
      }
    }
  };

  return (
    <div className="addcouriercontainer">
      <Sidebar />
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
        {successMessage && <div className="success-message">{successMessage}</div>}

        {/* Booking Details */}
        <input type="text" name="trackingId" placeholder="Tracking ID" value={formData.trackingId} onChange={handleChange} required />
        <input type="date" name="bookingDate" placeholder="Booking Date" value={formData.bookingDate} onChange={handleChange} required />
        <input type="text" name="sender" placeholder="Booking Center" value={formData.sender} onChange={handleChange} required />
        <input type="text" name="recipient" placeholder="To Center" value={formData.recipient} onChange={handleChange} required />
        
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="Shipped">Shipped</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
        
        <input type="text" name="address" placeholder="Current Location" value={formData.address} onChange={handleChange} required />

        {/* Delivery Details */}
        <input type="date" name="deliveryDate" placeholder="Delivery Date" value={formData.deliveryDate} onChange={handleChange} />
        <input type="text" name="deliveryCenter" placeholder="Delivery Center" value={formData.deliveryCenter} onChange={handleChange} required />
        <select name="deliveryStatus" value={formData.deliveryStatus} onChange={handleChange}>
          <option value="">Select Delivery Status</option>
          <option value="Pending">Pending</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
        <input type="text" name="currentLocation" placeholder="Current Location" value={formData.currentLocation} onChange={handleChange} required/>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Courier
        </button>
      </form>
    </div>
  );
};

export default AddCourierForm;
