import fs from 'fs';
import path from 'path';
import type { Request, Response, NextFunction } from 'express';

export const accessLogToFile = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const dir = process.env.ACCESS_LOG_DIR?.trim();
  if (!dir) {
    next();
    return;
  }

  const started = Date.now();
  res.on('finish', () => {
    const line =
      JSON.stringify({
        ts: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        durationMs: Date.now() - started
      }) + '\n';
    const file = path.join(dir, 'gateway-access.log');
    fs.mkdir(dir, { recursive: true }, (mkdirErr) => {
      if (mkdirErr) {
        return;
      }
      fs.appendFile(file, line, () => {});
    });
  });
  next();
};
