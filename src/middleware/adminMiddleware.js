module.exports = (req, res, next) => {
  if (req.user.role_id === 1) next(); // Assuming role_id 1 is 'admin'
  else res.status(403).json({ message: 'Forbidden' });
};