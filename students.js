import { Router } from 'express';
import Student from '../models/Student.js';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router = Router();
router.use(protect);
router.get('/me/profile', async (req, res, next) => { try { if (!req.user.student) return res.status(404).json({ message: 'Student profile not linked' }); const s = await Student.findById(req.user.student._id).populate('course'); res.json(s); } catch(e){next(e);} });
router.get('/', adminOnly, async (req, res, next) => { try { const q = String(req.query.q || '').trim(); const filter = q ? { $or: [{ name: { $regex: q, $options: 'i' } }, { enrollmentNo: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }] } : {}; const rows = await Student.find(filter).populate('course').sort({ createdAt: -1 }); res.json(rows); } catch(e){next(e);} });
router.post('/', adminOnly, async (req, res, next) => {
  try {
    const { enrollmentNo, name, email, phone, course, password, address, gender } = req.body;
    if (!enrollmentNo || !name || !email || !course || !password || password.length < 8) return res.status(400).json({ message: 'Enrollment number, name, email, course and password (minimum 8 characters) are required' });
    const student = await Student.create({ enrollmentNo, name, email, phone, course, address, gender });
    try { await User.create({ name, email, password, role: 'student', student: student._id }); }
    catch (e) { await Student.findByIdAndDelete(student._id); throw e; }
    res.status(201).json(await Student.findById(student._id).populate('course'));
  } catch(e){next(e);}
});
router.get('/:id', adminOnly, async (req,res,next)=>{try{const s=await Student.findById(req.params.id).populate('course'); if(!s)return res.status(404).json({message:'Student not found'});res.json(s);}catch(e){next(e);}});
router.put('/:id', adminOnly, async (req,res,next)=>{try{const allowed=['name','phone','dateOfBirth','gender','address','course','status'];const data=Object.fromEntries(Object.entries(req.body).filter(([k])=>allowed.includes(k)));const s=await Student.findByIdAndUpdate(req.params.id,data,{new:true,runValidators:true}).populate('course');if(!s)return res.status(404).json({message:'Student not found'});await User.updateOne({student:s._id},{name:s.name});res.json(s);}catch(e){next(e);}});
router.delete('/:id', adminOnly, async (req,res,next)=>{try{const s=await Student.findByIdAndDelete(req.params.id);if(!s)return res.status(404).json({message:'Student not found'});await User.deleteOne({student:s._id});res.json({message:'Student and linked login deleted'});}catch(e){next(e);}});
export default router;
