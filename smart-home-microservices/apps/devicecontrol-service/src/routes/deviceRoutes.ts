import { Router, Request, Response } from 'express';
import deviceService from '../services/deviceService';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const devices = deviceService.getAll();

  res.status(200).json({
    error: false,
    data: devices
  });
});

router.get('/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const device = deviceService.getById(id);

  if (!device) {
    res.status(404).json({
      error: true,
      message: 'Device not found'
    });
    return;
  }

  res.status(200).json({
    error: false,
    data: device
  });
});

router.post('/', (req: Request, res: Response) => {
  const { name, type, status, brightness, targetTemperature, locked } = req.body;

  if (!name || !type || !status) {
    res.status(400).json({
      error: true,
      message: 'name, type and status are required'
    });
    return;
  }

  const newDevice = deviceService.create({
    name,
    type,
    status,
    brightness,
    targetTemperature,
    locked
  });

  res.status(201).json({
    error: false,
    data: newDevice
  });
});

router.put('/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updatedDevice = deviceService.update(id, req.body);

  if (!updatedDevice) {
    res.status(404).json({
      error: true,
      message: 'Device not found'
    });
    return;
  }

  res.status(200).json({
    error: false,
    data: updatedDevice
  });
});

router.post('/:id/commands', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { command, value } = req.body;

  if (!command) {
    res.status(400).json({
      error: true,
      message: 'command is required'
    });
    return;
  }

  const updatedDevice = deviceService.executeCommand(id, command, value);

  if (!updatedDevice) {
    res.status(400).json({
      error: true,
      message: 'Invalid command or device not found'
    });
    return;
  }

  res.status(200).json({
    error: false,
    message: 'Command executed successfully',
    data: updatedDevice
  });
});

export default router;