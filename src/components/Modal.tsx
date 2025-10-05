import React from 'react';
import { X } from 'lucide-react'; // Icono de cerrar

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
