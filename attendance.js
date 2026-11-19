import { Router } from 'express';
import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router=Router();router.use(protect);
router.get('/me',async(req,res,next)=>{try{if(!req.user.student)return res.json([]);res.json(await Attendance.find({student:req.user.student._id}).populate('course','name code').sort({date:-1}));}catch(e){next(e);}});
router.get('/',adminOnly,async(req,res,next)=>{try{const filter={};if(req.query.student)filter.student=req.query.student;if(req.query.date)filter.date={ $gte:new Date(`${req.query.date}T00:00:00`),$lt:new Date(`${req.query.date}T23:59:59.999`) };res.json(await Attendance.find(filter).populate('student','name enrollmentNo').populate('course','name code').sort({date:-1}));}catch(e){next(e);}});
router.post('/',adminOnly,async(req,res,next)=>{try{const {student,date,status,remarks}=req.body;if(!student||!date||!['Present','Absent','Late'].includes(status))return res.status(400).json({message:'Student, date and valid status are required'});const s=await Student.findById(student);if(!s)return res.status(404).json({message:'Student not found'});const row=await Attendance.findOneAndUpdate({student,date:new Date(date)},{student,course:s.course,date:new Date(date),status,remarks,markedBy:req.user._id},{new:true,upsert:true,runValidators:true,setDefaultsOnInsert:true});res.status(201).json(row);}catch(e){next(e);}});
export default router;
