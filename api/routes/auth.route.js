import express from 'express';
import { login, logout, profile, signup } from '../controller/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router =express.Router();


router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/profile',profile)





export default router



