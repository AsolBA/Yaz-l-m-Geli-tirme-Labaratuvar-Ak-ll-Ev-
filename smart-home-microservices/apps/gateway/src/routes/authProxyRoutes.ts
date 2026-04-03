import { Router } from 'express';
import proxy from 'express-http-proxy';

const router = Router();

router.use(
  '/',
  proxy('http://auth-service:3001', {
    proxyReqPathResolver: (req) => {
      const path = req.originalUrl.replace('/api/auth', '');
      return `/auth${path || ''}`;
    }
  })
);

export default router;