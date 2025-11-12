import express from 'express';
import { UserController } from './auth.controller.js';

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/refresh-token', UserController.refreshToken);

router.get('/', UserController.getUsers);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
