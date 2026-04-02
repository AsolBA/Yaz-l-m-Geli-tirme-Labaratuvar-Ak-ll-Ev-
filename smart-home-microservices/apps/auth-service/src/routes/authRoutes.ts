import { Router, Request, Response } from 'express';
import authService from '../services/authService';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      error: true,
      message: 'Username and password are required'
    });
    return;
  }

  const result = await authService.login(username, password);

  if (!result) {
    res.status(401).json({
      error: true,
      message: 'Invalid credentials'
    });
    return;
  }

  res.status(200).json({
    error: false,
    token: result.token,
    role: result.role
  });
});

router.post('/validate', async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({
      error: true,
      message: 'Token is required'
    });
    return;
  }

  const result = await authService.validate(token);

  if (!result) {
    res.status(401).json({
      error: true,
      message: 'Invalid token'
    });
    return;
  }

  res.status(200).json(result);
});

router.post('/logout', async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({
      error: true,
      message: 'Token is required'
    });
    return;
  }

  const success = await authService.logout(token);

  if (!success) {
    res.status(401).json({
      error: true,
      message: 'Invalid token'
    });
    return;
  }

  res.status(200).json({
    error: false,
    message: 'Logged out successfully'
  });
});

export default router;