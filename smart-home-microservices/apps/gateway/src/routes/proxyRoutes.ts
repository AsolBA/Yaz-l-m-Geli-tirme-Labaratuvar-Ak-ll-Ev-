import { Router } from 'express';
import proxy from 'express-http-proxy';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorizeRoles } from '../middlewares/roleMiddleware';
import { InternalProxyOptionsFactory } from '../proxy/InternalProxyOptionsFactory';

const router = Router();
const internalProxyOpts = new InternalProxyOptionsFactory().createBaseOptions();

const telemetryPath = (req: { originalUrl: string }) => {
  const path = req.originalUrl.replace('/api/telemetry', '');
  return `/telemetry${path || ''}`;
};

router.put(
  '/telemetry/:id',
  authMiddleware,
  authorizeRoles('admin'),
  proxy('http://telemetry-service:3002', {
    ...internalProxyOpts,
    proxyReqPathResolver: (req) => `/telemetry/${req.params.id}`
  })
);

router.delete(
  '/telemetry/:id',
  authMiddleware,
  authorizeRoles('admin'),
  proxy('http://telemetry-service:3002', {
    ...internalProxyOpts,
    proxyReqPathResolver: (req) => `/telemetry/${req.params.id}`
  })
);

router.use(
  '/telemetry',
  authMiddleware,
  authorizeRoles('admin', 'resident', 'viewer'),
  proxy('http://telemetry-service:3002', {
    ...internalProxyOpts,
    proxyReqPathResolver: telemetryPath
  })
);

router.get(
  '/devices',
  authMiddleware,
  authorizeRoles('admin', 'resident', 'viewer'),
  proxy('http://devicecontrol-service:3003', {
    ...internalProxyOpts,
    proxyReqPathResolver: () => '/devices'
  })
);

router.get(
  '/devices/:id',
  authMiddleware,
  authorizeRoles('admin', 'resident', 'viewer'),
  proxy('http://devicecontrol-service:3003', {
    ...internalProxyOpts,
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
    ...internalProxyOpts,
    proxyReqPathResolver: () => '/devices'
  })
);

router.put(
  '/devices/:id',
  authMiddleware,
  authorizeRoles('admin'),
  proxy('http://devicecontrol-service:3003', {
    ...internalProxyOpts,
    proxyReqPathResolver: (req) => {
      return `/devices/${req.params.id}`;
    }
  })
);

router.delete(
  '/devices/:id',
  authMiddleware,
  authorizeRoles('admin'),
  proxy('http://devicecontrol-service:3003', {
    ...internalProxyOpts,
    proxyReqPathResolver: (req) => `/devices/${req.params.id}`
  })
);

router.post(
  '/devices/:id/commands',
  authMiddleware,
  authorizeRoles('admin', 'resident'),
  proxy('http://devicecontrol-service:3003', {
    ...internalProxyOpts,
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
    ...internalProxyOpts,
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
