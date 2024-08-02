import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

// Route tìm kiếm người dùng
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({ username: { $regex: query, $options: 'i' } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
