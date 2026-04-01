import { Router } from 'express';
import proxy from 'express-http-proxy';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(
  '/telemetry',
  authMiddleware,
  proxy('http://telemetry-service:3002', {
    proxyReqPathResolver: (req) => {
      const path = req.originalUrl.replace('/api/telemetry', '');
      return `/telemetry${path || ''}`;
    }
  })
);

router.use(
  '/devices',
  authMiddleware,
  proxy('http://devicecontrol-service:3003', {
    proxyReqPathResolver: (req) => {
      const path = req.originalUrl.replace('/api/devices', '');
      return `/devices${path || ''}`;
    }
  })
);

router.use(
  '/telemetry-unavailable',
  authMiddleware,
  proxy('http://127.0.0.1:3999', {
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