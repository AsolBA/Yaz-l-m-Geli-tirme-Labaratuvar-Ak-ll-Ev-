import mongoose from 'mongoose';
import Device from '../models/Device';

class DeviceService {
  async getAll() {
    return await Device.find().sort({ createdAt: -1 });
  }

  async getById(id: string) {
    return await Device.findById(id);
  }

  async create(deviceData: {
    name: string;
    type: 'light' | 'thermostat' | 'camera' | 'lock';
    status: 'on' | 'off';
    brightness?: number;
    targetTemperature?: number;
    locked?: boolean;
  }) {
    return await Device.create(deviceData);
  }

  async update(
    id: string,
    updateData: {
      name?: string;
      type?: 'light' | 'thermostat' | 'camera' | 'lock';
      status?: 'on' | 'off';
      brightness?: number;
      targetTemperature?: number;
      locked?: boolean;
    }
  ) {
    return await Device.findByIdAndUpdate(id, updateData, { new: true });
  }

  async executeCommand(id: string, command: string, value?: number | boolean) {
    const device = await Device.findById(id);

    if (!device) {
      return null;
    }

    switch (command) {
      case 'TURN_ON':
        device.status = 'on';
        break;

      case 'TURN_OFF':
        device.status = 'off';
        break;

      case 'SET_BRIGHTNESS':
        if (device.type !== 'light' || typeof value !== 'number') {
          return null;
        }
        device.brightness = value;
        device.status = value > 0 ? 'on' : 'off';
        break;

      case 'SET_TEMPERATURE':
        if (device.type !== 'thermostat' || typeof value !== 'number') {
          return null;
        }
        device.targetTemperature = value;
        device.status = 'on';
        break;

      case 'LOCK':
        if (device.type !== 'lock') {
          return null;
        }
        device.locked = true;
        device.status = 'on';
        break;

      case 'UNLOCK':
        if (device.type !== 'lock') {
          return null;
        }
        device.locked = false;
        device.status = 'off';
        break;

      default:
        return null;
    }

    await device.save();
    return device;
  }

  async deleteById(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      return 'invalid' as const;
    }

    const deleted = await Device.findByIdAndDelete(id);

    if (!deleted) {
      return 'not_found' as const;
    }

    return 'ok' as const;
  }
}

export default new DeviceService();