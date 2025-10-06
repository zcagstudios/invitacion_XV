import React, { useState } from 'react';
import { X, Copy } from 'lucide-react';

const AccountModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<{ tarjeta: boolean; cuenta: boolean }>({
    tarjeta: false,
    cuenta: false,
  });

  // Datos de cuenta desde variables de entorno
  const accountNumber = import.meta.env.VITE_ACCOUNT_NUMBER;
  const accountName = import.meta.env.VITE_ACCOUNT_NAME;
  const bankName = import.meta.env.VITE_BANK_NAME;
  const cuentaBancaria = import.meta.env.VITE_CUENTA_CLABE;
  const concepto = import.meta.env.VITE_CONCEPTO;

  const copyToClipboard = (text: string, type: 'tarjeta' | 'cuenta') => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [type]: true }));

    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [type]: false }));
    }, 3000);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 font-semibold"
      >
        <span>💳</span>
        <span>Ver Datos para Transferencia</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div
            className="relative w-full max-w-md bg-gradient-to-br from-gold-50 to-purple-50 p-8 rounded-lg shadow-2xl border-4 border-gold-400"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-script text-purple-600 mb-6 font-bold">
                Datos para Transferencia
              </h2>

              <div className="bg-white py-3 px-4 rounded-lg w-full text-left mb-4 shadow-md border-2 border-gold-300">
                <p className="text-sm font-semibold text-gray-600">A nombre de:</p>
                <p className="text-lg text-gray-800 font-medium">{accountName}</p>
              </div>

              <div className="bg-white py-3 px-4 rounded-lg w-full text-left mb-4 shadow-md border-2 border-gold-300">
                <p className="text-sm font-semibold text-gray-600">Banco:</p>
                <p className="text-lg text-gray-800 font-medium">{bankName}</p>
              </div>

              <div className="bg-white py-3 px-4 rounded-lg w-full text-left mb-4 shadow-md border-2 border-gold-300">
                <p className="text-sm font-semibold text-gray-600">Concepto:</p>
                <p className="text-lg text-gray-800 font-medium">{concepto}</p>
              </div>

              <div className="bg-white py-3 px-4 rounded-lg w-full text-left mb-4 shadow-md border-2 border-gold-300">
                <p className="text-sm font-semibold text-gray-600">Tarjeta:</p>
                <div className="flex justify-between items-center">
                  <p className="text-base text-gray-800 font-mono">{accountNumber}</p>
                  <button onClick={() => copyToClipboard(accountNumber, 'tarjeta')} className="ml-2">
                    <Copy size={18} className="text-gold-600 hover:text-gold-700" />
                  </button>
                </div>
              </div>

              <div className="bg-white py-3 px-4 rounded-lg w-full text-left mb-4 shadow-md border-2 border-gold-300">
                <p className="text-sm font-semibold text-gray-600">Cuenta CLABE:</p>
                <div className="flex justify-between items-center">
                  <p className="text-base text-gray-800 font-mono">{cuentaBancaria}</p>
                  <button onClick={() => copyToClipboard(cuentaBancaria, 'cuenta')} className="ml-2">
                    <Copy size={18} className="text-gold-600 hover:text-gold-700" />
                  </button>
                </div>
              </div>

              <p className="text-sm mt-2 text-green-600 font-medium h-6">
                {copied.tarjeta ? '✓ ¡Número de tarjeta copiado!' : copied.cuenta ? '✓ ¡Número de cuenta copiado!' : ''}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountModal;
