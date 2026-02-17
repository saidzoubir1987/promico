
import React, { useState, useMemo } from 'react';
import { Customer, SubscriptionStatus } from '../types';
import CustomerCard from './CustomerCard';
import { SearchIcon } from './icons/SearchIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface CustomerListProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: string) => void;
  onAdd: () => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | 'all'>('all');

  const filteredCustomers = useMemo(() => {
    return customers
      .filter(customer => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const hasMatchingDevice = customer.devices.some(device =>
          device.name.toLowerCase().includes(lowerSearchTerm) ||
          device.serialNumber.toLowerCase().includes(lowerSearchTerm)
        );
        return (
          customer.name.toLowerCase().includes(lowerSearchTerm) ||
          customer.phone?.includes(searchTerm) ||
          hasMatchingDevice
        );
      })
      .filter(customer => {
        if (statusFilter === 'all') return true;
        return customer.devices.some(device => device.status === statusFilter);
      });
  }, [customers, searchTerm, statusFilter]);
  
  const exportToCSV = () => {
    const headers = ['Customer Name', 'Customer Phone', 'Device Name', 'Device Serial', 'Start Date', 'End Date', 'Status'];
    const rows = customers.flatMap(c => 
        c.devices.map(d => [
            c.name,
            c.phone || '',
            d.name,
            d.serialNumber,
            d.startDate,
            d.endDate,
            d.status || ''
        ])
    );

    let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n" 
        + rows.map(e => e.join(",")).join("\n");
        
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscriptions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 sm:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="ابحث عن زبون، جهاز، رقم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border rounded-lg bg-slate-50 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as (SubscriptionStatus | 'all'))}
            className="pr-8 pl-4 py-2 border rounded-lg bg-slate-50 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">كل الحالات</option>
            <option value={SubscriptionStatus.Active}>نشط</option>
            <option value={SubscriptionStatus.ExpiringSoon}>قريب الانتهاء</option>
            <option value={SubscriptionStatus.Expired}>منتهي</option>
          </select>
           <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
             <DownloadIcon/>
             <span>تصدير CSV</span>
           </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map(customer => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400 py-8">
            لا يوجد زبائن يطابقون معايير البحث.
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
