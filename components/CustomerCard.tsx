
import React, { useState } from 'react';
import { Customer } from '../types';
import DeviceRow from './DeviceRow';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';

interface CustomerCardProps {
  customer: Customer;
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg transition-shadow hover:shadow-md">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer bg-slate-50 dark:bg-slate-700/50 rounded-t-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className="font-bold text-lg text-slate-800 dark:text-slate-100">{customer.name}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400">{customer.phone}</div>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {customer.devices.length} {customer.devices.length === 1 ? 'جهاز' : 'أجهزة'}
            </span>
          <ChevronDownIcon className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="mb-4 flex justify-end gap-2">
            <button
              onClick={() => onEdit(customer)}
              className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="تعديل"
            >
              <PencilIcon />
            </button>
            <button
              onClick={() => onDelete(customer.id)}
              className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="حذف"
            >
              <TrashIcon />
            </button>
          </div>
          
          <div className="hidden md:grid grid-cols-5 gap-4 font-semibold text-sm text-slate-500 dark:text-slate-400 px-4 py-2 border-b dark:border-slate-600">
            <span>اسم الجهاز</span>
            <span>رقم الجهاز</span>
            <span>تاريخ البدء</span>
            <span>تاريخ الانتهاء</span>
            <span className="text-center">الحالة</span>
          </div>
          
          <div className="space-y-2">
            {customer.devices.map(device => (
              <DeviceRow key={device.id} device={device} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCard;
