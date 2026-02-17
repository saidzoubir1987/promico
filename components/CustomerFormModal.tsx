import React, { useState, useEffect } from 'react';
import { Customer, Device } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';

interface CustomerFormModalProps {
  customer: Customer | null;
  onClose: () => void;
  onSave: (customer: Customer) => void;
}

const CustomerFormModal: React.FC<CustomerFormModalProps> = ({ customer, onClose, onSave }) => {
  const [formData, setFormData] = useState<Customer>({
    id: '',
    name: '',
    phone: '',
    email: '',
    devices: [],
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData({
        id: '',
        name: '',
        phone: '',
        email: '',
        devices: [{ id: crypto.randomUUID(), name: '', serialNumber: '', startDate: '', endDate: '' }],
      });
    }
  }, [customer]);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeviceChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newDevices = [...formData.devices];
    newDevices[index] = { ...newDevices[index], [name]: value };
    setFormData(prev => ({ ...prev, devices: newDevices }));
  };

  const addDevice = () => {
    setFormData(prev => ({
      ...prev,
      devices: [...prev.devices, { id: crypto.randomUUID(), name: '', serialNumber: '', startDate: '', endDate: '' }],
    }));
  };

  const removeDevice = (index: number) => {
    if (formData.devices.length > 1) {
        setFormData(prev => ({
          ...prev,
          devices: prev.devices.filter((_, i) => i !== index),
        }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.devices.some(d => !d.name.trim() || !d.serialNumber.trim() || !d.startDate || !d.endDate)) {
      alert("يرجى ملء جميع الحقول المطلوبة (اسم الزبون، وكل بيانات الأجهزة).");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">
              {customer ? 'تعديل بيانات الزبون' : 'إضافة زبون جديد'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">اسم الزبون*</label>
                <input type="text" name="name" value={formData.name} onChange={handleCustomerChange} className="form-input" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">رقم الهاتف</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleCustomerChange} className="form-input" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">البريد الإلكتروني</label>
                <input type="email" name="email" value={formData.email} onChange={handleCustomerChange} className="form-input" />
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4 border-b pb-2 dark:border-slate-600">الأجهزة</h3>
            {formData.devices.map((device, index) => (
              <div key={device.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded-lg dark:border-slate-700 relative">
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">اسم الجهاز*</label>
                        <input type="text" name="name" value={device.name} onChange={(e) => handleDeviceChange(index, e)} className="form-input" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">الرقم التسلسلي*</label>
                        <input type="text" name="serialNumber" value={device.serialNumber} onChange={(e) => handleDeviceChange(index, e)} className="form-input" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">تاريخ البدء*</label>
                        <input type="date" name="startDate" value={device.startDate} onChange={(e) => handleDeviceChange(index, e)} className="form-input" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">تاريخ الانتهاء*</label>
                        <input type="date" name="endDate" value={device.endDate} onChange={(e) => handleDeviceChange(index, e)} className="form-input" required />
                    </div>
                </div>
                {formData.devices.length > 1 && (
                  <button type="button" onClick={() => removeDevice(index)} className="absolute top-2 left-2 text-red-500 hover:text-red-700 p-1 rounded-full bg-red-100 dark:bg-red-900/50">
                    <TrashIcon />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addDevice} className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mt-2">
              <PlusIcon /> إضافة جهاز آخر
            </button>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-4 flex justify-end gap-4 rounded-b-lg">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors">إلغاء</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">حفظ</button>
          </div>
        </form>
        {/* FIX: Removed invalid `jsx` prop from `<style>` tag, which is not a standard React feature and caused a type error. Merged styles into a single block for clarity. */}
        <style>{`
            .form-input {
                width: 100%;
                padding: 0.5rem 0.75rem;
                border-radius: 0.5rem;
                border: 1px solid;
                border-color: #d1d5db; /* coolGray-300 */
                background-color: #ffffff; /* white */
            }
            .dark .form-input {
                border-color: #4b5563; /* coolGray-600 */
                background-color: #374151; /* coolGray-700 */
            }
            .form-input:focus {
                outline: 2px solid transparent;
                outline-offset: 2px;
                --tw-ring-color: #6366f1; /* indigo-500 */
                --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
                --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
                box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
            }
        `}</style>
      </div>
    </div>
  );
};

export default CustomerFormModal;
