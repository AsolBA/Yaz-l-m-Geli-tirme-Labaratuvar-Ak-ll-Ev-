import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, (_req: Request, res: Response) => {
  res.status(200).json({
    error: false,
    message: 'Telemetry data fetched successfully'
  });
});

export default router;
