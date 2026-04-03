import { Router } from 'express';
import proxy from 'express-http-proxy';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeRoles } from '../middlewares/roleMiddleware';

const router = Router();

router.use(
  '/telemetry',
  authMiddleware,
  authorizeRoles('admin', 'resident', 'viewer'),
  proxy('http://telemetry-service:3002', {
    proxyReqPathResolver: (req) => {
      const path = req.originalUrl.replace('/api/telemetry', '');
      return `/telemetry${path || ''}`;
    }
  })
);

router.get(
  '/devices',
  authMiddleware,
  authorizeRoles('admin', 'resident', 'viewer'),
  proxy('http://devicecontrol-service:3003', {
    proxyReqPathResolver: () => '/devices'
  })
);

router.get(
  '/devices/:id',
  authMiddleware,
  authorizeRoles('admin', 'resident', 'viewer'),
  proxy('http://devicecontrol-service:3003', {
    proxyReqPathResolver: (req) => {
      return `/devices/${req.params.id}`;
    }
  })
);

router.post(
  '/devices',
  authMiddleware,
  authorizeRoles('admin'),
  proxy('http://devicecontrol-service:3003', {
    proxyReqPathResolver: () => '/devices'
  })
);

router.put(
  '/devices/:id',
  authMiddleware,
  authorizeRoles('admin'),
  proxy('http://devicecontrol-service:3003', {
    proxyReqPathResolver: (req) => {
      return `/devices/${req.params.id}`;
    }
  })
);

router.post(
  '/devices/:id/commands',
  authMiddleware,
  authorizeRoles('admin', 'resident'),
  proxy('http://devicecontrol-service:3003', {
    proxyReqPathResolver: (req) => {
      return `/devices/${req.params.id}/commands`;
    }
  })
);

router.use(
  '/telemetry-unavailable',
  authMiddleware,
  authorizeRoles('admin', 'resident', 'viewer'),
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