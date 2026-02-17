
import React, { useMemo } from 'react';
import { Customer, SubscriptionStatus } from '../types';
import { UserIcon } from './icons/UserIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ExclamationTriangleIcon } from './icons/ExclamationTriangleIcon';
import { XCircleIcon } from './icons/XCircleIcon';

interface DashboardProps {
  customers: Customer[];
}

const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex items-center space-x-4 rtl:space-x-reverse">
      <div className={`rounded-full p-3 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ customers }) => {
  const stats = useMemo(() => {
    let active = 0;
    let expiringSoon = 0;
    let expired = 0;
    customers.forEach(customer => {
      customer.devices.forEach(device => {
        if (device.status === SubscriptionStatus.Active) active++;
        else if (device.status === SubscriptionStatus.ExpiringSoon) expiringSoon++;
        else if (device.status === SubscriptionStatus.Expired) expired++;
      });
    });
    return {
      totalCustomers: customers.length,
      active,
      expiringSoon,
      expired,
    };
  }, [customers]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="إجمالي الزبائن" value={stats.totalCustomers} icon={<UserIcon className="text-white h-6 w-6" />} color="bg-blue-500" />
      <StatCard title="اشتراكات نشطة" value={stats.active} icon={<CheckCircleIcon className="text-white h-6 w-6" />} color="bg-green-500" />
      <StatCard title="تنتهي قريباً" value={stats.expiringSoon} icon={<ExclamationTriangleIcon className="text-white h-6 w-6" />} color="bg-yellow-500" />
      <StatCard title="اشتراكات منتهية" value={stats.expired} icon={<XCircleIcon className="text-white h-6 w-6" />} color="bg-red-500" />
    </div>
  );
};

export default Dashboard;
