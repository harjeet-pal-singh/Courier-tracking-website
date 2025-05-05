import express from 'express';
import { loginAdmin, validateAdminToken } from '../controllers/authController.js';

const router = express.Router();

// Validate token route (GET)
router.get('/validateToken', validateAdminToken);

// Login route (POST)
router.post('/login', loginAdmin);

export default router;
