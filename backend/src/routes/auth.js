import express from 'express';
import { register, login, logout, refreshToken } from '../controller/auth';
import { verifyAuth } from '../middleware';

const router = express.Router();

// POST /auth/register
router.post('/register', register);

// POST /auth/login
router.post('/login', login);

// DELETE /auth/logout
router.delete('/logout', verifyAuth, logout);

// GET /auth/refresh-token
router.get('/refresh-token', refreshToken);

export default router;
