import { Router, Request, Response } from 'express';
import deviceService from '../services/deviceService';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const devices = await deviceService.getAll();

  res.status(200).json({
    error: false,
    data: devices
  });
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const device = await deviceService.getById(id);

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

router.post('/', async (req: Request, res: Response) => {
  const { name, type, status, brightness, targetTemperature, locked } = req.body;

  if (!name || !type || !status) {
    res.status(400).json({
      error: true,
      message: 'name, type and status are required'
    });
    return;
  }

  const newDevice = await deviceService.create({
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

router.put('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updatedDevice = await deviceService.update(id, req.body);

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

router.delete('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const result = await deviceService.deleteById(id);

  if (result === 'invalid') {
    res.status(400).json({
      error: true,
      message: 'Invalid device id'
    });
    return;
  }

  if (result === 'not_found') {
    res.status(404).json({
      error: true,
      message: 'Device not found'
    });
    return;
  }

  res.status(204).send();
});

router.post('/:id/commands', async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { command, value } = req.body;

  if (!command) {
    res.status(400).json({
      error: true,
      message: 'command is required'
    });
    return;
  }

  const updatedDevice = await deviceService.executeCommand(id, command, value);

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