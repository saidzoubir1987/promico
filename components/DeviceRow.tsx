
import React from 'react';
import { Device, SubscriptionStatus } from '../types.ts';

interface DeviceRowProps {
  device: Device;
}

const statusClasses: Record<SubscriptionStatus, { bg: string; text: string; }> = {
  [SubscriptionStatus.Active]: {
    bg: 'bg-green-100 dark:bg-green-900/50',
    text: 'text-green-700 dark:text-green-300',
  },
  [SubscriptionStatus.ExpiringSoon]: {
    bg: 'bg-yellow-100 dark:bg-yellow-800/50',
    text: 'text-yellow-700 dark:text-yellow-300',
  },
  [SubscriptionStatus.Expired]: {
    bg: 'bg-red-100 dark:bg-red-900/50',
    text: 'text-red-700 dark:text-red-300',
  },
};

const DeviceRow: React.FC<DeviceRowProps> = ({ device }) => {
  const statusStyle = device.status ? statusClasses[device.status] : { bg: 'bg-slate-100', text: 'text-slate-700' };

  const renderField = (label: string, value: string) => (
    <div className="md:hidden">
        <span className="font-semibold text-sm text-slate-500 dark:text-slate-400">{label}: </span>
        <span>{value}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-4 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 md:bg-transparent md:dark:bg-transparent">
        <div className="md:col-span-1">
            {renderField('اسم الجهاز', device.name)}
            <span className="hidden md:inline">{device.name}</span>
        </div>
        <div className="md:col-span-1">
            {renderField('رقم الجهاز', device.serialNumber)}
            <span className="hidden md:inline">{device.serialNumber}</span>
        </div>
        <div className="md:col-span-1">
            {renderField('تاريخ البدء', new Date(device.startDate).toLocaleDateString('ar-EG'))}
            <span className="hidden md:inline">{new Date(device.startDate).toLocaleDateString('ar-EG')}</span>
        </div>
        <div className="md:col-span-1">
            {renderField('تاريخ الانتهاء', new Date(device.endDate).toLocaleDateString('ar-EG'))}
            <span className="hidden md:inline">{new Date(device.endDate).toLocaleDateString('ar-EG')}</span>
        </div>
        <div className="md:col-span-1 md:text-center">
            {renderField('الحالة', device.status || '')}
            {device.status &&
                <span className={`hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                    {device.status}
                </span>
            }
        </div>
    </div>
  );
};

export default DeviceRow;
