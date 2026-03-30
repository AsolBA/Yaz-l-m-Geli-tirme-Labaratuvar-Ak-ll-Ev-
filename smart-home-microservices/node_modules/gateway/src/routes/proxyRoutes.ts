import { Router } from 'express';
import proxy from 'express-http-proxy';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(
  '/telemetry',
  authMiddleware,
  proxy('http://localhost:3002', {
    proxyReqPathResolver: () => '/health'
  })
);

router.use(
  '/devices',
  authMiddleware,
  proxy('http://localhost:3003', {
    proxyReqPathResolver: () => '/health'
  })
);

router.use(
  '/telemetry-unavailable',
  authMiddleware,
  proxy('http://localhost:3999', {
    proxyReqPathResolver: () => '/health',
    proxyErrorHandler: (_err, res) => {
      res.status(502).json({
        error: true,
        message: 'Bad Gateway'
      });
    }
  })
);

export default router;
