import React from 'react';
import { FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';

interface ToastNotificationProps {
  message: string;
  status: 'success' | 'error';
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ 
  message, 
  status,
  onClose 
}) => {
  return (
    <div className={`toast p-4 rounded-lg shadow-lg max-w-md flex items-start
      ${status === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
    >
      {status === 'success' ? (
        <FiCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
      ) : (
        <FiXCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
      )}
      <div className="flex-1">
        <p className="text-gray-800">{message}</p>
      </div>
      <button 
        onClick={onClose}
        className="ml-4 text-gray-500 hover:text-gray-700"
        aria-label="Close notification"
      >
        <FiX size={16} />
      </button>
    </div>
  );
};

export default ToastNotification;