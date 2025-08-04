const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'a57b2dd842d221dd543c11459831e0eb6a4ea9729320f425499d34066d3661a6b9a034d25333a0cb34aa4a3fa4f5ea3529f6a0a2fda383b9c949dd567976b0a1';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
