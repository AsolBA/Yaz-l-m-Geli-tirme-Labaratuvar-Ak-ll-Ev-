import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      error: true,
      message: 'Unauthorized'
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (token === 'valid-admin-token') {
    (req as any).user = { role: 'admin' };
    return next();
  }

  res.status(403).json({
    error: true,
    message: 'Forbidden'
  });
};
