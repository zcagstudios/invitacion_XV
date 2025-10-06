import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white/90 backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-2xl border border-white/50 max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow: '0 8px 32px 0 rgba(168, 85, 247, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-purple-600 transition-colors bg-white/50 rounded-full p-2 hover:bg-white/80"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
