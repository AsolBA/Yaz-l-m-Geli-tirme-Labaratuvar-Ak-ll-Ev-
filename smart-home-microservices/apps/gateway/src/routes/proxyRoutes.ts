import { Router, Request } from 'express';
import proxy from 'express-http-proxy';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(
  '/telemetry',
  authMiddleware,
  proxy('http://localhost:3002', {
    proxyReqPathResolver: (_req: Request) => {
      return '/health';
    }
  })
);

router.use(
  '/devices',
  authMiddleware,
  proxy('http://localhost:3003', {
    proxyReqPathResolver: (_req: Request) => {
      return '/health';
    }
  })
);

export default router;
