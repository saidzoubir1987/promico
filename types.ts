
export enum SubscriptionStatus {
  Active = 'نشط',
  ExpiringSoon = 'قريب الانتهاء',
  Expired = 'منتهي',
}

export interface Device {
  id: string;
  name: string;
  serialNumber: string;
  startDate: string;
  endDate: string;
  status?: SubscriptionStatus;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  devices: Device[];
}
