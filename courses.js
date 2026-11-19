import { Router } from 'express';
import Course from '../models/Course.js';
import { protect, adminOnly } from '../middleware/auth.js';
const router=Router(); router.use(protect);
router.get('/',async(req,res,next)=>{try{res.json(await Course.find().sort({name:1}));}catch(e){next(e);}});
router.post('/',adminOnly,async(req,res,next)=>{try{const {name,code,description,duration}=req.body;if(!name||!code)return res.status(400).json({message:'Course name and code are required'});res.status(201).json(await Course.create({name,code,description,duration}));}catch(e){next(e);}});
router.put('/:id',adminOnly,async(req,res,next)=>{try{const c=await Course.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!c)return res.status(404).json({message:'Course not found'});res.json(c);}catch(e){next(e);}});
router.delete('/:id',adminOnly,async(req,res,next)=>{try{const c=await Course.findByIdAndDelete(req.params.id);if(!c)return res.status(404).json({message:'Course not found'});res.json({message:'Course deleted'});}catch(e){next(e);}});
export default router;
