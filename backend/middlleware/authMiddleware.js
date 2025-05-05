import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Protect middleware to check for JWT
export const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  // Remove "Bearer" if it exists
  token = token.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use JWT_SECRET to verify
    req.user = decoded.user; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
