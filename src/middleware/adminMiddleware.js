module.exports = (req, res, next) => {
  console.log(`Checking admin access for user ${req.user.id}`);
  if (req.user.role_id === 1) next(); // Assuming role_id 1 is 'admin'
  else res.status(403).json({ message: 'Forbidden' });
};