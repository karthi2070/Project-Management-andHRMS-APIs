const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'You have access to the attendance module!' });
});

module.exports = router;