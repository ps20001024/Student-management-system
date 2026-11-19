import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body.email || '').toLowerCase().trim();
    const password = String(req.body.password || '');
    const user = await User.findOne({ email }).select('+password').populate('student');
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Incorrect email or password' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, student: user.student?._id || null } });
  } catch (e) { next(e); }
});
router.get('/me', protect, (req, res) => res.json({ id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role, student: req.user.student?._id || null }));
export default router;
