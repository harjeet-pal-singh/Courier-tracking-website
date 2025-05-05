import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pages.css';
import Sidebar from './Sidebar';

const ManageCouriers = () => {
  const [couriers, setCouriers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingCourierId, setEditingCourierId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    sender: '',
    recipient: '',
    status: '',
    address: '',
    deliveryStatus: '',
    deliveryDate: '',
    bookingDate: '',
    currentLocation: '',  // New field for currentLocation
    deliveryCenter: '', // Added deliveryCenter field
  });
  const [successMessage, setSuccessMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/couriers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCouriers(response.data);
      } catch (error) {
        console.error('Error fetching couriers:', error);
      }
    };
    fetchCouriers();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/couriers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCouriers((prev) => prev.filter((c) => c._id !== id));
      setSuccessMessage('✅ Courier deleted');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting courier:', error);
      alert(`❌ Failed to delete courier: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEditClick = (courier) => {
    setEditingCourierId(courier._id);
    setEditFormData({
      sender: courier.sender,
      recipient: courier.recipient,
      status: courier.status,
      address: courier.address,
      deliveryStatus: courier.deliveryStatus,
      deliveryDate: courier.deliveryDate,
      bookingDate: courier.bookingDate,
      currentLocation: courier.currentLocation,  // Set currentLocation
      deliveryCenter: courier.deliveryCenter,  // Set deliveryCenter
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/couriers/${editingCourierId}`,
        {
          sender: editFormData.sender,
          recipient: editFormData.recipient,
          status: editFormData.status,
          address: editFormData.address,
          deliveryStatus: editFormData.deliveryStatus,
          deliveryDate: editFormData.deliveryDate,
          bookingDate: editFormData.bookingDate,
          currentLocation: editFormData.currentLocation,
          deliveryCenter: editFormData.deliveryCenter,  // Include deliveryCenter
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCouriers((prev) =>
        prev.map((courier) =>
          courier._id === editingCourierId ? { ...courier, ...editFormData } : courier
        )
      );
      setEditingCourierId(null);
      setSuccessMessage('✅ Courier updated');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating courier:', error.response?.data || error.message);
      alert('❌ Failed to update courier');
    }
  };

  const filteredCouriers = couriers.filter((courier) => {
    const matchesSearch = courier.trackingId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === '' || courier.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="manage-couriers">
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <h1>Manage Couriers</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by Tracking ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Shipped">Shipped</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <table className="couriers-table">
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Status</th>
            <th>Address</th>
            <th>Delivery Status</th>
            <th>Booking Date</th>
            <th>Delivery Date</th>
            <th>Current Location</th>
            <th>Delivery Center</th> {/* New column for deliveryCenter */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCouriers.map((courier) => (
            <tr key={courier._id}>
              <td>{courier.trackingId}</td>
              <td>
                {editingCourierId === courier._id ? (
                  <input
                    name="sender"
                    value={editFormData.sender}
                    onChange={handleEditChange}
                  />
                ) : (
                  courier.sender
                )}
              </td>
              <td>
                {editingCourierId === courier._id ? (
                  <input
                    name="recipient"
                    value={editFormData.recipient}
                    onChange={handleEditChange}
                  />
                ) : (
                  courier.recipient
                )}
              </td>
              <td>
                {editingCourierId === courier._id ? (
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditChange}
                  >
                    <option value="Shipped">Shipped</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                ) : (
                  courier.status
                )}
              </td>
              <td>
                {editingCourierId === courier._id ? (
                  <input
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditChange}
                  />
                ) : (
                  courier.address
                )}
              </td>
              <td>
                {editingCourierId === courier._id ? (
                  <select
                    name="deliveryStatus"
                    value={editFormData.deliveryStatus}
                    onChange={handleEditChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                ) : (
                  courier.deliveryStatus
                )}
              </td>
              <td>
                {editingCourierId === courier._id ? (
                  <input
                    type="date"
                    name="bookingDate"
                    value={editFormData.bookingDate}
                    onChange={handleEditChange}
                  />
                ) : (
                  courier.bookingDate
                )}
              </td>
              <td>
                {editingCourierId === courier._id ? (
                  <input
                    type="date"
                    name="deliveryDate"
                    value={editFormData.deliveryDate}
                    onChange={handleEditChange}
                  />
                ) : (
                  courier.deliveryDate
                )}
              </td>
              <td>
                {editingCourierId === courier._id ? (
                  <input
                    name="currentLocation"
                    value={editFormData.currentLocation}
                    onChange={handleEditChange}
                  />
                ) : (
                  courier.currentLocation
                )}
              </td>
              <td>
                {editingCourierId === courier._id ? (
                  <input
                    name="deliveryCenter"
                    value={editFormData.deliveryCenter}
                    onChange={handleEditChange}
                  />
                ) : (
                  courier.deliveryCenter
                )}
              </td>
              <td>
                {editingCourierId === courier._id ? (
                  <button onClick={handleUpdate}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(courier)}>Edit</button>
                    <button onClick={() => handleDelete(courier._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCouriers;
