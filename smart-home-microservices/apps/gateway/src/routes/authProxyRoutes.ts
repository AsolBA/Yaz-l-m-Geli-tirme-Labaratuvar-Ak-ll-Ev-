import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const response = await axios.post('http://auth-service:3001/auth/login', req.body);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(
      error.response?.data || {
        error: true,
        message: 'Auth service unavailable'
      }
    );
  }
});

router.post('/validate', async (req: Request, res: Response) => {
  try {
    const response = await axios.post('http://auth-service:3001/auth/validate', req.body);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(
      error.response?.data || {
        error: true,
        message: 'Auth service unavailable'
      }
    );
  }
});

router.post('/logout', async (req: Request, res: Response) => {
  try {
    const response = await axios.post('http://auth-service:3001/auth/logout', req.body);
    res.status(response.status).json(response.data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json(
      error.response?.data || {
        error: true,
        message: 'Auth service unavailable'
      }
    );
  }
});

export default router;