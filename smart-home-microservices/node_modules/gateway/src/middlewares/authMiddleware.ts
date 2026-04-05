import { Request, Response, NextFunction } from 'express';
import { HttpAuthTokenValidator } from '../security/HttpAuthTokenValidator';

const tokenValidator = new HttpAuthTokenValidator();

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
  const outcome = await tokenValidator.validateBearerToken(token);

  if (outcome.status === 'invalid') {
    res.status(401).json({
      error: true,
      message: 'Invalid token'
    });
    return;
  }

  if (outcome.status === 'unreachable') {
    res.status(401).json({
      error: true,
      message: 'Unauthorized'
    });
    return;
  }

  (req as Request & { user: unknown }).user = outcome.user;
  next();
};
