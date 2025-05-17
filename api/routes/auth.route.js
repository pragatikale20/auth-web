import express from 'express';
import { signin } from '../controllers/auth.controller.js'; // Import signin controller
import { signup } from '../controllers/auth.controller.js'; // Import signup controller
import { googleAuth } from '../controllers/auth.controller.js'; // Import googleAuth controller




const router = express.Router();


// Define the signup route
router.post('/signin', signin); 
router.post('/signup', signup); 
router.post('/google', googleAuth); 
export default router;
