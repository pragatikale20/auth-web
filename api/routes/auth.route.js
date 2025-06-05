import express from 'express';
import { signin } from '../controllers/auth.controller.js'; 
import { signup } from '../controllers/auth.controller.js'; 
import { googleAuth } from '../controllers/auth.controller.js'; 

const router = express.Router();
router.post('/signin', signin); 
router.post('/signup', signup); 
router.post('/google', googleAuth); 
export default router;
