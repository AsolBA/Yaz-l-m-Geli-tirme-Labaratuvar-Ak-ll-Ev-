import { Request, Response, NextFunction, RequestHandler } from 'express';

export class RoleBasedAccessGate {
  static middleware(...allowedRoles: string[]): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
      const user = (req as { user?: { role?: string } }).user;

      if (!user || !allowedRoles.includes(user.role ?? '')) {
        res.status(403).json({
          error: true,
          message: 'Forbidden'
        });
        return;
      }

      next();
    };
  }
}
