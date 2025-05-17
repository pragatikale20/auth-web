import express from 'express';
import {
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js'; // Import updateUser and deleteUser controllers

import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;
