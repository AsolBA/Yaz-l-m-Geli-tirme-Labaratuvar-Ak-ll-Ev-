import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      error: true,
      message: 'Unauthorized'
    });
    return;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({
      error: true,
      message: 'Unauthorized'
    });
    return;
  }

  const token = parts[1];

  try {
    const response = await axios.post('http://localhost:3001/auth/validate', {
      token
    });

    const user = response.data;

    (req as any).user = {
      userId: user.userId,
      username: user.username,
      role: user.role
    };

    next();
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      res.status(401).json({
        error: true,
        message: 'Unauthorized'
      });
      return;
    }

    res.status(502).json({
      error: true,
      message: 'Auth service unavailable'
    });
  }
};