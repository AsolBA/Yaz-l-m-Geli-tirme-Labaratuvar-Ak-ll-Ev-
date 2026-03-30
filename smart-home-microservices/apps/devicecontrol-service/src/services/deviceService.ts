type DeviceType = 'light' | 'thermostat' | 'camera' | 'lock';
type DeviceStatus = 'on' | 'off';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  brightness?: number;
  targetTemperature?: number;
  locked?: boolean;
}

class DeviceService {
  private devices: Device[] = [
    {
      id: '1',
      name: 'Salon Lambası',
      type: 'light',
      status: 'off',
      brightness: 0
    },
    {
      id: '2',
      name: 'Yatak Odası Klima',
      type: 'thermostat',
      status: 'on',
      targetTemperature: 22
    },
    {
      id: '3',
      name: 'Giriş Kapısı Kilidi',
      type: 'lock',
      status: 'on',
      locked: true
    }
  ];

  getAll(): Device[] {
    return this.devices;
  }

  getById(id: string): Device | undefined {
    return this.devices.find((device) => device.id === id);
  }

  create(deviceData: Omit<Device, 'id'>): Device {
    const newDevice: Device = {
      id: String(this.devices.length + 1),
      ...deviceData
    };

    this.devices.push(newDevice);
    return newDevice;
  }

  update(id: string, updateData: Partial<Omit<Device, 'id'>>): Device | null {
    const device = this.getById(id);

    if (!device) {
      return null;
    }

    Object.assign(device, updateData);
    return device;
  }

  executeCommand(
    id: string,
    command: string,
    value?: number | boolean
  ): Device | null {
    const device = this.getById(id);

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

    return device;
  }
}

export default new DeviceService();