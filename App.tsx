
import React, { useState, useMemo, useEffect } from 'react';
import { Customer, Device, SubscriptionStatus } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CustomerList from './components/CustomerList';
import CustomerFormModal from './components/CustomerFormModal';
import { PlusIcon } from './components/icons/PlusIcon';
import { initialData } from './constants';

const App: React.FC = () => {
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  useEffect(() => {
    if (customers.length === 0) {
      setCustomers(initialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const getStatus = (endDate: string): SubscriptionStatus => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return SubscriptionStatus.Expired;
    if (diffDays <= 30) return SubscriptionStatus.ExpiringSoon;
    return SubscriptionStatus.Active;
  };

  const customersWithStatus = useMemo((): Customer[] => {
    return customers.map(customer => ({
      ...customer,
      devices: customer.devices.map(device => ({
        ...device,
        status: getStatus(device.endDate),
      })),
    }));
  }, [customers]);

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الزبون؟')) {
      setCustomers(customers.filter(c => c.id !== customerId));
    }
  };

  const handleSaveCustomer = (customer: Customer) => {
    if (customer.id) {
      setCustomers(customers.map(c => (c.id === customer.id ? customer : c)));
    } else {
      setCustomers([...customers, { ...customer, id: crypto.randomUUID() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <Dashboard customers={customersWithStatus} />
        <div className="mt-8">
          <CustomerList
            customers={customersWithStatus}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
            onAdd={handleAddCustomer}
          />
        </div>
      </main>
      {isModalOpen && (
        <CustomerFormModal
          customer={editingCustomer}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCustomer}
        />
      )}
      <button
        onClick={handleAddCustomer}
        className="fixed bottom-6 left-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label="إضافة زبون جديد"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default App;
