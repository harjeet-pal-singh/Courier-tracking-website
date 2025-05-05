import express from 'express';
import Courier from '../models/Courier.js';
import { protect } from '../middlleware/authMiddleware.js';

const router = express.Router();

// Get a single courier by tracking ID (Public Route)
router.get('/api/couriers/:trackingId', async (req, res) => {
  try {
    const courier = await Courier.findOne({ trackingId: req.params.trackingId });
    if (!courier) {
      return res.status(404).json({ message: 'Courier not found' });
    }
    res.json(courier);
  } catch (error) {
    console.error('Error fetching courier:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all couriers (Protected Route)
router.get('/', protect, async (req, res) => {
  try {
    const couriers = await Courier.find();
    res.json(couriers);
  } catch (err) {
    console.error('Error fetching couriers:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get a single courier by ID (Protected Route)
router.get('/:id', protect, async (req, res) => {
  try {
    const courier = await Courier.findById(req.params.id);
    if (!courier) {
      return res.status(404).json({ message: 'Courier not found' });
    }
    res.json(courier);
  } catch (err) {
    console.error('Error fetching courier:', err);
    res.status(500).json({ message: err.message });
  }
});

// Add a new courier (Protected Route)
router.post('/', protect, async (req, res) => {
  const { trackingId, sender, recipient, status, address, deliveryCenter, currentLocation } = req.body;

  // Validate all required fields
  if (!trackingId || !sender || !recipient || !status || !address || !deliveryCenter || !currentLocation) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newCourier = new Courier({
      trackingId, sender, recipient, status, address, deliveryCenter, currentLocation
    });
    await newCourier.save();
    res.status(201).json({ message: 'Courier added successfully!' });
  } catch (err) {
    console.error('Error adding courier:', err);
    res.status(500).json({ message: err.message });
  }
});

// Update a courier's details (Protected Route)
router.put('/:id', protect, async (req, res) => {
  const { sender, recipient, status, address, deliveryStatus, deliveryDate, bookingDate, currentLocation, deliveryCenter } = req.body;
  
  try {
    const courier = await Courier.findById(req.params.id);
    if (!courier) {
      return res.status(404).json({ message: 'Courier not found' });
    }

    // Update the courier with the new values from the request body
    courier.sender = sender || courier.sender;
    courier.recipient = recipient || courier.recipient;
    courier.status = status || courier.status;
    courier.address = address || courier.address;
    courier.deliveryStatus = deliveryStatus || courier.deliveryStatus;
    courier.deliveryDate = deliveryDate || courier.deliveryDate;
    courier.bookingDate = bookingDate || courier.bookingDate;
    courier.currentLocation = currentLocation || courier.currentLocation;
    courier.deliveryCenter = deliveryCenter || courier.deliveryCenter;

    // Save the updated courier
    await courier.save();
    res.json({ message: 'Courier updated successfully!' });
  } catch (err) {
    console.error('Error updating courier:', err);
    res.status(500).json({ message: err.message });
  }
});

// Delete a courier (Protected Route)
router.delete('/:id', protect, async (req, res) => {
  try {
    const courier = await Courier.findById(req.params.id);
    if (!courier) {
      return res.status(404).json({ message: 'Courier not found' });
    }
    await courier.deleteOne();
    res.json({ message: 'Courier deleted successfully' });
  } catch (error) {
    console.error('Error deleting courier:', error);
    res.status(500).json({ message: 'Failed to delete courier' });
  }
});

export default router;
