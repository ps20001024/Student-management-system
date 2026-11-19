import { Router } from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import Student from '../models/Student.js'; import Course from '../models/Course.js'; import Attendance from '../models/Attendance.js'; import Result from '../models/Result.js';
const router=Router();router.use(protect,adminOnly);
router.get('/stats',async(req,res,next)=>{try{const [students,courses,attendance,results,recentStudents]=await Promise.all([Student.countDocuments(),Course.countDocuments(),Attendance.countDocuments(),Result.countDocuments(),Student.find().populate('course','name').sort({createdAt:-1}).limit(5).select('name enrollmentNo status createdAt')]);res.json({students,courses,attendance,results,recentStudents});}catch(e){next(e);}});
export default router;
