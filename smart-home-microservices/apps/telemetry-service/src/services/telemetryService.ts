export interface TelemetryRecord {
  id: string;
  deviceId: string;
  temperature: number;
  humidity: number;
  energyUsage: number;
  motionDetected: boolean;
  timestamp: string;
}

class TelemetryService {
  private records: TelemetryRecord[] = [
    {
      id: '1',
      deviceId: '1',
      temperature: 24,
      humidity: 45,
      energyUsage: 12.5,
      motionDetected: false,
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      deviceId: '2',
      temperature: 22,
      humidity: 40,
      energyUsage: 9.2,
      motionDetected: true,
      timestamp: new Date().toISOString()
    }
  ];

  getAll(): TelemetryRecord[] {
    return this.records;
  }

  getById(id: string): TelemetryRecord | undefined {
    return this.records.find((record) => record.id === id);
  }

  getByDeviceId(deviceId: string): TelemetryRecord[] {
    return this.records.filter((record) => record.deviceId === deviceId);
  }

  getLatestByDeviceId(deviceId: string): TelemetryRecord | undefined {
    const deviceRecords = this.getByDeviceId(deviceId);

    if (deviceRecords.length === 0) {
      return undefined;
    }

    return deviceRecords[deviceRecords.length - 1];
  }

  create(data: Omit<TelemetryRecord, 'id' | 'timestamp'>): TelemetryRecord {
    const newRecord: TelemetryRecord = {
      id: String(this.records.length + 1),
      ...data,
      timestamp: new Date().toISOString()
    };

    this.records.push(newRecord);
    return newRecord;
  }
}

export default new TelemetryService();