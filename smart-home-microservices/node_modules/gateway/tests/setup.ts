import type { Request, Response } from 'express';
import axios from 'axios';

jest.mock('axios');

jest.mock('express-http-proxy', () => {
  return (
    target: string,
    options?: {
      proxyReqPathResolver?: (req: Request) => string;
      proxyErrorHandler?: (err: Error, res: Response) => void;
    }
  ) => {
    return (req: Request, res: Response) => {
      if (target.includes('3999')) {
        if (options?.proxyErrorHandler) {
          options.proxyErrorHandler(new Error('Service unavailable'), res);
          return;
        }

        res.status(502).json({
          error: true,
          message: 'Bad Gateway'
        });
        return;
      }

      if (target.includes('telemetry-service')) {
        res.status(200).json({
          service: 'telemetry-service',
          status: 'ok'
        });
        return;
      }

      if (target.includes('devicecontrol-service')) {
        res.status(200).json({
          service: 'devicecontrol-service',
          status: 'ok'
        });
        return;
      }

      res.status(502).json({
        error: true,
        message: 'Bad Gateway'
      });
    };
  };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  mockedAxios.post.mockImplementation(async (_url: string, body?: unknown) => {
    const token = (body as { token?: string } | undefined)?.token;

    if (token === 'valid-admin-token') {
      return {
        data: {
          valid: true,
          userId: '1',
          username: 'admin1',
          role: 'admin'
        }
      };
    }

    if (token === 'fake-token-without-permission') {
      return {
        data: {
          valid: true,
          userId: '9',
          username: 'guest1',
          role: 'guest'
        }
      };
    }

    throw new Error('Invalid token');
  });
});

afterEach(() => {
  mockedAxios.post.mockReset();
});
