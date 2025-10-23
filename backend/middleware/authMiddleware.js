import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  // Look for token in Authorization header: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err)
    return res.status(403).json({ error: 'Invalid or expired token' })
  }
    req.user = payload; // payload contains { id }
    next();
  });
}
