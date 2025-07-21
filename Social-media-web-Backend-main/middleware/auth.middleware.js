const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verify Error:', err);
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = { id: decoded.userId };
    next();
  });
};

module.exports = auth;