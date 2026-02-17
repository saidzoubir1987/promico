
import { Customer } from './types.ts';

const today = new Date();
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
const formatDate = (date: Date): string => date.toISOString().split('T')[0];

export const initialData: Customer[] = [
  {
    id: 'c1',
    name: 'أحمد محمود',
    phone: '0501234567',
    email: 'ahmed@example.com',
    devices: [
      { id: 'd1-1', name: 'جهاز استقبال 1', serialNumber: 'SN12345', startDate: formatDate(addDays(today, -300)), endDate: formatDate(addDays(today, 65)), status: undefined },
      { id: 'd1-2', name: 'جهاز استقبال 2', serialNumber: 'SN12346', startDate: formatDate(addDays(today, -360)), endDate: formatDate(addDays(today, 5)), status: undefined },
    ]
  },
  {
    id: 'c2',
    name: 'فاطمة الزهراء',
    phone: '0557654321',
    email: 'fatima@example.com',
    devices: [
      { id: 'd2-1', name: 'راوتر انترنت', serialNumber: 'SN98765', startDate: formatDate(addDays(today, -400)), endDate: formatDate(addDays(today, -10)), status: undefined },
    ]
  },
  {
    id: 'c3',
    name: 'خالد عبدالله',
    phone: '0533334444',
    email: 'khalid@example.com',
    devices: [
      { id: 'd3-1', name: 'كاميرا مراقبة', serialNumber: 'SN55555', startDate: formatDate(addDays(today, -100)), endDate: formatDate(addDays(today, 265)), status: undefined },
    ]
  }
];
