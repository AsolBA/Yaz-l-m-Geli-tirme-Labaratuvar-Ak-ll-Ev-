import { Router, Request, Response } from 'express';
import axios from 'axios';
import { internalServiceHeaders } from '../internalToken';

const router = Router();

const authAxiosConfig = () => ({
  headers: {
    ...internalServiceHeaders(),
    'Content-Type': 'application/json'
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      'http://auth-service:3001/auth/login',
      req.body,
      authAxiosConfig()
    );
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

router.post('/register', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      'http://auth-service:3001/auth/register',
      req.body,
      authAxiosConfig()
    );
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
    const response = await axios.post(
      'http://auth-service:3001/auth/validate',
      req.body,
      authAxiosConfig()
    );
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
    const response = await axios.post(
      'http://auth-service:3001/auth/logout',
      req.body,
      authAxiosConfig()
    );
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
