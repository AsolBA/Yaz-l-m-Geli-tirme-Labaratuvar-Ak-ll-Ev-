import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: true,
      message: 'Unauthorized'
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const response = await axios.post('http://auth-service:3001/auth/validate', {
      token
    });

    if (!response.data.valid) {
      res.status(401).json({
        error: true,
        message: 'Invalid token'
      });
      return;
    }

    (req as any).user = response.data;
    next();
  } catch {
    res.status(401).json({
      error: true,
      message: 'Unauthorized'
    });
  }
};