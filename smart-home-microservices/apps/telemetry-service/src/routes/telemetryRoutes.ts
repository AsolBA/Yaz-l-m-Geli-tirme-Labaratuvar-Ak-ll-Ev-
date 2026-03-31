import { Router, Request, Response } from 'express';
import telemetryService from '../services/telemetryService';

const router = Router();

router.get('/device/:deviceId/latest', (req: Request, res: Response) => {
  const deviceId = String(req.params.deviceId);
  const record = telemetryService.getLatestByDeviceId(deviceId);

  if (!record) {
    res.status(404).json({
      error: true,
      message: 'No telemetry data found for this device'
    });
    return;
  }

  res.status(200).json({
    error: false,
    data: record
  });
});

router.get('/device/:deviceId', (req: Request, res: Response) => {
  const deviceId = String(req.params.deviceId);
  const records = telemetryService.getByDeviceId(deviceId);

  res.status(200).json({
    error: false,
    data: records
  });
});

router.get('/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const record = telemetryService.getById(id);

  if (!record) {
    res.status(404).json({
      error: true,
      message: 'Telemetry record not found'
    });
    return;
  }

  res.status(200).json({
    error: false,
    data: record
  });
});

router.get('/', (_req: Request, res: Response) => {
  const records = telemetryService.getAll();

  res.status(200).json({
    error: false,
    data: records
  });
});

router.post('/', (req: Request, res: Response) => {
  const { deviceId, temperature, humidity, energyUsage, motionDetected } = req.body;

  if (
    !deviceId ||
    temperature === undefined ||
    humidity === undefined ||
    energyUsage === undefined ||
    motionDetected === undefined
  ) {
    res.status(400).json({
      error: true,
      message: 'deviceId, temperature, humidity, energyUsage and motionDetected are required'
    });
    return;
  }

  const newRecord = telemetryService.create({
    deviceId,
    temperature,
    humidity,
    energyUsage,
    motionDetected
  });

  res.status(201).json({
    error: false,
    data: newRecord
  });
});

export default router;