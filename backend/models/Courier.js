// models/Courier.js
import mongoose from 'mongoose';

const courierSchema = mongoose.Schema({
  trackingId: {
    type: String,
    required: true,
    unique: true
  },
  bookingDate: {
    type: Date,
    default: Date.now  // Automatically sets the current date/time when created
  },
  sender: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Shipped', 'In Transit', 'Delivered'],
    default: 'Shipped'
  },
  address: {
    type: String,
    required: true
  },
  // Delivery Details
  deliveryDate: {
    type: Date,
    default: Date.now // You can customize this to allow for a real delivery date
  },
  deliveryCenter: {
    type: String,
    required: true
  },
  deliveryStatus: {
    type: String,
    required: true,
    enum: ['Pending', 'Out for Delivery', 'Delivered'],
    default: 'Pending'
  },
  currentLocation: {
    type: String,
    required: true
  }
});


const Courier = mongoose.model('Courier', courierSchema);

export default Courier;
