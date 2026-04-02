import Telemetry from '../models/Telemetry';

class TelemetryService {
  async getAll() {
    return await Telemetry.find().sort({ createdAt: -1 });
  }

  async getById(id: string) {
    return await Telemetry.findById(id);
  }

  async getByDeviceId(deviceId: string) {
    return await Telemetry.find({ deviceId }).sort({ createdAt: -1 });
  }

  async getLatestByDeviceId(deviceId: string) {
    return await Telemetry.findOne({ deviceId }).sort({ createdAt: -1 });
  }

  async create(data: {
    deviceId: string;
    temperature: number;
    humidity: number;
    energyUsage: number;
    motionDetected: boolean;
  }) {
    return await Telemetry.create(data);
  }
}

export default new TelemetryService();